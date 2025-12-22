import { Users, Calendar, ShoppingCart, DollarSign } from 'lucide-react';
import StatCard from '../my-events/StateCard';

export interface IStateCardProps {
  stateCardData: {
    totalUsers: number;
    totalEvents: number;
    totalSales: number;
    totalRevenue: number;
  };
}
type StatKey = keyof IStateCardProps['stateCardData'];

const statCardConfig: {
  key: StatKey;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  trend: number;
}[] = [
  {
    key: 'totalUsers',
    title: 'Total Users',
    icon: Users,
    trend: 7,
  },
  {
    key: 'totalEvents',
    title: 'Total Events',
    icon: Calendar,
    trend: 2,
  },
  {
    key: 'totalSales',
    title: 'Total Sales',
    icon: ShoppingCart,
    trend: 5,
  },
  {
    key: 'totalRevenue',
    title: 'Total Revenue',
    icon: DollarSign,
    trend: 10,
  },
];

const StatCards = ({ stateCardData }: IStateCardProps) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
      {statCardConfig.map(({ key, title, icon, trend }) => (
        <StatCard
          key={key}
          title={title}
          icon={icon}
          value={stateCardData[key]}
          trend={trend}
          trendUp={true}
        />
      ))}
    </div>
  );
};

export default StatCards;
