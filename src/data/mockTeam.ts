export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  status: 'online' | 'away' | 'busy' | 'offline'
  avatarHue: number
}

export const mockTeam: TeamMember[] = [
  { id: 't1',  name: 'Sarah Chen',     role: 'Lead Designer',       department: 'Design',       email: 'sarah.chen@company.com',    phone: '+27 82 123 4567', status: 'online',  avatarHue: 210 },
  { id: 't2',  name: 'Marcus Webb',    role: 'Backend Engineer',     department: 'Engineering',  email: 'm.webb@company.com',        phone: '+27 72 234 5678', status: 'online',  avatarHue: 140 },
  { id: 't3',  name: 'Priya Sharma',   role: 'UX Researcher',        department: 'Design',       email: 'priya@design.co',           phone: '+27 83 345 6789', status: 'away',    avatarHue: 300 },
  { id: 't4',  name: 'Jordan Kim',     role: 'DevOps Engineer',      department: 'Infrastructure', email: 'jordan.kim@company.com',  phone: '+27 71 456 7890', status: 'online',  avatarHue: 30  },
  { id: 't5',  name: 'Ava Nkosi',      role: 'Product Manager',      department: 'Product',      email: 'a.nkosi@company.com',       phone: '+27 82 567 8901', status: 'busy',    avatarHue: 0   },
  { id: 't6',  name: 'Liam O\'Brien',  role: 'Frontend Engineer',    department: 'Engineering',  email: 'l.obrien@company.com',      phone: '+27 73 678 9012', status: 'online',  avatarHue: 190 },
  { id: 't7',  name: 'Zanele Dlamini', role: 'QA Lead',              department: 'Engineering',  email: 'z.dlamini@company.com',     phone: '+27 84 789 0123', status: 'offline', avatarHue: 260 },
  { id: 't8',  name: 'Ethan Park',     role: 'Data Analyst',         department: 'Analytics',    email: 'e.park@company.com',        phone: '+27 72 890 1234', status: 'away',    avatarHue: 170 },
  { id: 't9',  name: 'Isla Ferreira',  role: 'Marketing Manager',    department: 'Marketing',    email: 'i.ferreira@company.com',    phone: '+27 83 901 2345', status: 'online',  avatarHue: 330 },
  { id: 't10', name: 'Noah Mthembu',   role: 'Security Engineer',    department: 'Infrastructure', email: 'n.mthembu@company.com',   phone: '+27 71 012 3456', status: 'online',  avatarHue: 80  },
  { id: 't11', name: 'Chloe Rousseau', role: 'Finance Director',     department: 'Finance',      email: 'c.rousseau@company.com',    phone: '+27 82 123 5678', status: 'offline', avatarHue: 50  },
  { id: 't12', name: 'Aiden Coetzee',  role: 'CTO',                  department: 'Leadership',   email: 'a.coetzee@company.com',     phone: '+27 73 234 6789', status: 'busy',    avatarHue: 220 },
]
