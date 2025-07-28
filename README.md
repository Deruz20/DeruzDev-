# OmniTrack - Universal Business Management

OmniTrack is a comprehensive web-based business management solution that helps you track invoices, expenses, and inventory all in one place. Built with modern technologies for scalability and ease of use.

## Features

- **Invoice Management**: Create, track, and manage invoices with customizable statuses
- **Expense Tracking**: Monitor business expenses by category and date
- **Inventory Management**: Keep track of your products with SKU, quantity, and pricing
- **Custom Fields**: Add custom fields to any module (Text, Number, Date types)
- **Module Toggle**: Enable/disable modules based on your business needs
- **Authentication**: Secure login with Google OAuth or Email/Password
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with Shadcn/UI components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth and Credentials providers
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials (optional, for Google sign-in)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd omnitrack
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/omnitrack"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. Set up the database:
```bash
npx prisma db push
npx prisma generate
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Getting Started

1. **Sign Up/Login**: Use Google OAuth or create an account with email/password
2. **Dashboard**: View overview statistics of your business data
3. **Modules**: Access Invoices, Expenses, and Inventory from the sidebar
4. **Settings**: Customize which modules are visible and create custom fields

### Managing Data

- **Add Records**: Click the "Add" button in any module to create new records
- **Edit Records**: Click "Edit" on any table row to modify existing data
- **Delete Records**: Click "Delete" to remove records (with confirmation)

### Custom Fields

1. Go to Settings → Custom Fields
2. Enter field name, select type (Text/Number/Date), and choose which module it applies to
3. Click "Add Field"
4. The custom field will now appear in add/edit forms for that module

### Module Management

In Settings → Module Settings, you can toggle modules on/off. Disabled modules won't appear in the sidebar navigation.

## API Endpoints

All API endpoints require authentication and automatically filter data by user:

- `GET/POST /api/invoices` - List/create invoices
- `GET/PUT/DELETE /api/invoices/[id]` - Get/update/delete specific invoice
- `GET/POST /api/expenses` - List/create expenses  
- `GET/PUT/DELETE /api/expenses/[id]` - Get/update/delete specific expense
- `GET/POST /api/inventory` - List/create inventory items
- `GET/PUT/DELETE /api/inventory/[id]` - Get/update/delete specific item
- `GET/POST /api/custom-fields` - List/create custom fields
- `DELETE /api/custom-fields/[id]` - Delete custom field
- `PUT /api/user/modules` - Update enabled modules

## Database Schema

The application uses the following main models:

- **User**: User accounts with enabled modules configuration
- **Invoice**: Invoice records with client, amount, status, due date
- **Expense**: Expense records with item, category, amount, purchase date  
- **InventoryItem**: Inventory items with name, SKU, quantity, price
- **CustomField**: User-defined fields for modules
- **CustomFieldValue**: Values for custom fields on records

## Development

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Database Management

```bash
# Reset database
npx prisma db push --force-reset

# View database in Prisma Studio
npx prisma studio
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

Built with OmniTrack by [DeruzDev]
