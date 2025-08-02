import { Invoice, Customer, Revenue, User } from '@prisma/client';
import { hashSync } from 'bcrypt';

export const users: User[] = [
  {
    id: '410544b2-400a-45c1-9f20-4113b2d11122',
    name: 'John Doe',
    email: 'user@nextmail.com',
    password: hashSync('123456', 10),
  },
];

export const customers: Customer[] = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64420',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    imageUrl: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a64421',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    imageUrl: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-7377-85e9-fec4b6a64422',
    name: 'Hector Sims',
    email: 'hector@sims.com',
    imageUrl: '/customers/hector-sims.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64423',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    imageUrl: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64424',
    name: 'Michaela Clark',
    email: 'michaela@clark.com',
    imageUrl: '/customers/michaela-clark.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64425',
    name: 'Aron Moore',
    email: 'aron@moore.com',
    imageUrl: '/customers/aron-moore.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64426',
    name: 'Leo Pham',
    email: 'leo@pham.com',
    imageUrl: '/customers/leo-pham.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64427',
    name: 'Sonia Key',
    email: 'sonia@key.com',
    imageUrl: '/customers/sonia-key.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64428',
    name: 'Christina Smith',
    email: 'christina@smith.com',
    imageUrl: '/customers/christina-smith.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64429',
    name: 'John Wilson',
    email: 'john@wilson.com',
    imageUrl: '/customers/john-wilson.png',
  },
];

export const invoices: Invoice[] = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64420',
    customerId: '3958dc9e-712f-4377-85e9-fec4b6a64420',
    amount: 15000,
    status: 'pending',
    date: '2023-01-20',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64421',
    customerId: '3958dc9e-742f-4377-85e9-fec4b6a64421',
    amount: 25000,
    status: 'paid',
    date: '2023-02-15',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64422',
    customerId: '3958dc9e-7377-85e9-fec4b6a64422',
    amount: 5000,
    status: 'pending',
    date: '2023-03-01',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64423',
    customerId: '3958dc9e-712f-4377-85e9-fec4b6a64423',
    amount: 45000,
    status: 'paid',
    date: '2023-04-10',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64424',
    customerId: '3958dc9e-712f-4377-85e9-fec4b6a64424',
    amount: 12000,
    status: 'pending',
    date: '2023-05-22',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64425',
    customerId: '3958dc9e-712f-4377-85e9-fec4b6a64425',
    amount: 30000,
    status: 'paid',
    date: '2023-06-05',
  },
];

export const revenue: Revenue[] = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];
