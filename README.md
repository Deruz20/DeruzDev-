# OmniTrack Dashboard

A modern, responsive business dashboard built with pure HTML, CSS, and JavaScript. Features advanced analytics, project management, client tracking, and financial reporting.

## 🚀 Features

- **Modern Design** - Clean, professional interface with dark/light themes
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Real-time Dashboard** - Animated metrics and interactive charts
- **Project Management** - Complete project lifecycle tracking
- **Client Management** - Comprehensive client database
- **Financial Tracking** - Transaction management and reporting
- **Advanced Analytics** - Data visualization with Chart.js
- **Offline Support** - IndexedDB for local data storage
- **Export/Import** - Data portability features

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: IndexedDB for client-side storage
- **Charts**: Chart.js for data visualization
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Deruz20/DeruzDev-.git
cd DeruzDev-
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel --prod
```

### Manual Deployment

The application is built with static files and can be deployed to any web server:

1. Upload all files to your web server
2. Ensure `index.html` is set as the default document
3. Configure your server to serve static files

## 📁 Project Structure

```
omnitrack-dashboard/
├── index.html              # Main HTML file
├── public/
│   ├── css/
│   │   ├── styles.css      # Main styles
│   │   ├── components.css  # Component styles
│   │   └── animations.css  # Animation styles
│   └── js/
│       ├── app.js          # Main application
│       ├── database.js     # Database management
│       ├── utils.js        # Utility functions
│       ├── charts.js       # Chart management
│       ├── navigation.js   # Navigation system
│       ├── dashboard.js    # Dashboard functionality
│       ├── projects.js     # Project management
│       ├── clients.js      # Client management
│       ├── transactions.js # Transaction management
│       └── settings.js     # Settings management
├── package.json            # Dependencies and scripts
├── vercel.json            # Vercel configuration
└── README.md              # This file
```

## 🎯 Usage

### Dashboard
- View key metrics and KPIs
- Interactive charts and graphs
- Recent activity feed
- Quick actions

### Projects
- Create and manage projects
- Track progress and budgets
- Assign clients to projects
- Monitor deadlines

### Clients
- Maintain client database
- Track client projects and revenue
- Contact information management
- Client status tracking

### Transactions
- Record income and expenses
- Link transactions to clients
- Financial reporting
- Export transaction data

### Settings
- User profile management
- Theme preferences
- Notification settings
- Data export/import

## 🎨 Customization

### Themes
The application supports light and dark themes. You can customize colors by modifying CSS custom properties in `public/css/styles.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
  /* ... more variables */
}
```

### Adding New Features
1. Create new JavaScript modules in `public/js/`
2. Add corresponding CSS in `public/css/`
3. Update navigation in `navigation.js`
4. Add new pages to `index.html`

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Deruz20**
- GitHub: [@Deruz20](https://github.com/Deruz20)
- Repository: [DeruzDev-](https://github.com/Deruz20/DeruzDev-)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ by Deruz20