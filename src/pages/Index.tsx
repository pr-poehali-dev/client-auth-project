import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Visit {
  id: string;
  date: string;
  timeIn: string;
  timeOut: string;
  remaining: number;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export default function Index() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [phone, setPhone] = useState('');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [currentView, setCurrentView] = useState<'news' | 'profile' | 'admin'>('news');

  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Новый тренажёр для функционального тренинга',
      description: 'В зале появилось современное оборудование для кроссфита и функциональных тренировок',
      date: '15 декабря 2024',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    },
    {
      id: '2',
      title: 'Праздничное расписание на новогодние каникулы',
      description: 'С 31 декабря по 8 января клуб работает по специальному графику',
      date: '10 декабря 2024',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop',
    },
    {
      id: '3',
      title: 'Акция: приведи друга и получи бонус',
      description: 'За каждого приведённого друга — дополнительная тренировка в подарок',
      date: '5 декабря 2024',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    },
  ]);

  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsDescription, setNewNewsDescription] = useState('');
  const [newNewsImage, setNewNewsImage] = useState('');

  const mockVisits: Visit[] = [
    { id: '1', date: '19.12.2024', timeIn: '10:30', timeOut: '12:15', remaining: 7 },
    { id: '2', date: '17.12.2024', timeIn: '18:00', timeOut: '19:45', remaining: 8 },
    { id: '3', date: '15.12.2024', timeIn: '09:15', timeOut: '11:00', remaining: 9 },
    { id: '4', date: '13.12.2024', timeIn: '19:00', timeOut: '20:30', remaining: 10 },
    { id: '5', date: '11.12.2024', timeIn: '07:30', timeOut: '09:00', remaining: 11 },
  ];

  const handleLogin = () => {
    if (phone.length >= 10) {
      setIsAuth(true);
      if (phone === '+79999999999') {
        setIsAdmin(true);
      }
      setShowLoginDialog(false);
      setShowSuccessDialog(true);
      setCurrentView('news');
    }
  };

  const handleAddNews = () => {
    if (newNewsTitle && newNewsDescription && newNewsImage) {
      const newItem: NewsItem = {
        id: Date.now().toString(),
        title: newNewsTitle,
        description: newNewsDescription,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        image: newNewsImage,
      };
      setNews([newItem, ...news]);
      setNewNewsTitle('');
      setNewNewsDescription('');
      setNewNewsImage('');
      setShowAdminDialog(false);
    }
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter(item => item.id !== id));
  };

  useEffect(() => {
    if (showSuccessDialog) {
      const timer = setTimeout(() => {
        setShowSuccessDialog(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessDialog]);

  const handleProfileClick = () => {
    if (isAuth) {
      setCurrentView('profile');
    } else {
      setShowLoginDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentView('news')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="Dumbbell" size={20} className="text-primary" />
            </div>
            <h1 className="text-xl font-bold">Фитнес Клуб</h1>
          </button>
          <div className="flex items-center gap-2">
            {isAdmin && currentView === 'news' && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView('admin')}
                className="flex items-center gap-2"
              >
                <Icon name="Settings" size={18} />
                Админ
              </Button>
            )}
            {currentView === 'admin' && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentView('news')}
                className="flex items-center gap-2"
              >
                <Icon name="Newspaper" size={18} />
                Новости
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                if (currentView === 'profile') {
                  setCurrentView('news');
                } else {
                  handleProfileClick();
                }
              }}
              className={`flex items-center gap-2 transition-all duration-200 ${
                isAuth && currentView !== 'profile' && currentView !== 'admin'
                  ? 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground' 
                  : ''
              }`}
            >
              <Icon name={currentView === 'profile' ? "Newspaper" : (isAuth ? "User" : "LogIn")} size={18} />
              {currentView === 'profile' ? "Новости" : (isAuth ? "Профиль" : "Войти")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6">
        {currentView === 'news' ? (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Новости клуба</h2>
            {news.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    {item.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : currentView === 'admin' ? (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Управление новостями</h2>
              <Button onClick={() => setShowAdminDialog(true)} className="flex items-center gap-2">
                <Icon name="Plus" size={18} />
                Добавить новость
              </Button>
            </div>
            <div className="space-y-4">
              {news.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-32 h-24 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteNews(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Мой профиль</h2>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon name="User" size={28} className="text-primary" />
                  </div>
                  <div>
                    <CardTitle>Александр Петров</CardTitle>
                    <CardDescription>{phone}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Осталось тренировок</p>
                    <p className="text-3xl font-bold text-primary">{mockVisits[0].remaining}</p>
                  </div>
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Activity" size={28} className="text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="History" size={20} />
                  История посещений
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockVisits.map((visit, index) => (
                    <div key={visit.id}>
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Icon name="CalendarCheck" size={18} className="text-accent" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{visit.date}</p>
                            <p className="text-xs text-muted-foreground">
                              {visit.timeIn} - {visit.timeOut}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="font-semibold">
                          Осталось: {visit.remaining}
                        </Badge>
                      </div>
                      {index < mockVisits.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 animate-scale-in">
              <Icon name="CheckCircle2" size={32} className="text-primary" />
            </div>
            <DialogTitle className="text-2xl">Вы успешно вошли!</DialogTitle>
            <DialogDescription>
              Добро пожаловать в личный кабинет
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full h-12 text-base font-semibold">
              ОК
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
              <Icon name="Dumbbell" size={32} className="text-primary" />
            </div>
            <DialogTitle className="text-2xl">Вход в личный кабинет</DialogTitle>
            <DialogDescription>
              Введите номер телефона для доступа к профилю
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Номер телефона</label>
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <Button onClick={handleLogin} className="w-full h-12 text-base font-semibold">
              Войти
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Добавить новость</DialogTitle>
            <DialogDescription>
              Заполните информацию о новой новости клуба
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                placeholder="Название новости"
                value={newNewsTitle}
                onChange={(e) => setNewNewsTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Текст новости"
                value={newNewsDescription}
                onChange={(e) => setNewNewsDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Ссылка на картинку</Label>
              <Input
                id="image"
                placeholder="https://example.com/image.jpg"
                value={newNewsImage}
                onChange={(e) => setNewNewsImage(e.target.value)}
              />
              {newNewsImage && (
                <div className="mt-2 rounded-lg overflow-hidden border">
                  <img 
                    src={newNewsImage} 
                    alt="Предпросмотр"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Ошибка+загрузки';
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleAddNews} 
                className="flex-1"
                disabled={!newNewsTitle || !newNewsDescription || !newNewsImage}
              >
                Добавить
              </Button>
              <Button 
                onClick={() => setShowAdminDialog(false)} 
                variant="outline"
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}