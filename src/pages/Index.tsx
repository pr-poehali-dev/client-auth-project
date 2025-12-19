import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  const [phone, setPhone] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'profile'>('news');

  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'Новый тренажёр для функционального тренинга',
      description: 'В зале появилось современное оборудование для кроссфита и функциональных тренировок',
      date: '15 декабря 2024',
      image: '🏋️',
    },
    {
      id: '2',
      title: 'Праздничное расписание на новогодние каникулы',
      description: 'С 31 декабря по 8 января клуб работает по специальному графику',
      date: '10 декабря 2024',
      image: '🎄',
    },
    {
      id: '3',
      title: 'Акция: приведи друга и получи бонус',
      description: 'За каждого приведённого друга — дополнительная тренировка в подарок',
      date: '5 декабря 2024',
      image: '🎁',
    },
  ];

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
    }
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
        <Card className="w-full max-w-md shadow-lg animate-fade-in">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <Icon name="Dumbbell" size={32} className="text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Фитнес Клуб</CardTitle>
            <CardDescription className="text-base">
              Войдите для доступа к личному кабинету
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="Dumbbell" size={20} className="text-primary" />
            </div>
            <h1 className="text-xl font-bold">Фитнес Клуб</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsAuth(false)}>
            <Icon name="LogOut" size={20} />
          </Button>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'news' ? 'default' : 'outline'}
            onClick={() => setActiveTab('news')}
            className="flex-1 h-11"
          >
            <Icon name="Newspaper" size={18} className="mr-2" />
            Новости
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'outline'}
            onClick={() => setActiveTab('profile')}
            className="flex-1 h-11"
          >
            <Icon name="User" size={18} className="mr-2" />
            Профиль
          </Button>
        </div>

        {activeTab === 'news' ? (
          <div className="space-y-4 animate-fade-in">
            {mockNews.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{news.image}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{news.title}</CardTitle>
                      <CardDescription className="text-sm">{news.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    {news.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
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
    </div>
  );
}
