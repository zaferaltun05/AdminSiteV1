# La’Viesta RP FiveM Admin Panel

Modern, dark-themed, professional admin panel for FiveM roleplay server management.

## Stack
- Backend: Node.js (Express)
- Frontend: React (Vite)
- Database: MySQL


## Features
- JWT authentication, role-based access
- Live player stats, admin actions, logs
- Responsive, card-based UI with red accents
- Secure, extensible, and real-time ready

## Installation & Usage

### 1. Clone the repository
```
git clone <repo-url>
cd adminsite
```

### 2. Backend Setup
```
cd backend
npm install
cp .env.example .env   # .env dosyanızı doldurun
# MySQL sunucunuzu başlatın ve db/migrations altındaki SQL dosyalarını uygulayın
npm run dev            # veya npm start
```

### 3. Frontend Setup
```
cd frontend
npm install
npm run dev
# Paneli http://localhost:5173 adresinden açabilirsiniz
```

### 4. Kullanıcı Girişi
- Discord ile giriş yapın (ilk girişte admin/superadmin rolünü DB'den atayın)
- Rol bazlı erişim ve yetkiler otomatik uygulanır

### 5. Özellikler ve Yönetim
- Tüm modüller menüde erişilebilir
- Sunucu yönetimi, toplu işlemler, raporlar, istatistikler, bakım modu vb. panelden yönetilir

### 6. Bakım Modu & Güvenlik
- Bakım modunu sadece superadmin açabilir
- API anahtarları, yedekleme, yetkisiz erişim logları ve daha fazlası entegre

---
Herhangi bir hata veya öneri için iletişime geçebilirsiniz.
