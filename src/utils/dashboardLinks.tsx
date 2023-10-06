import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import DescriptionIcon from "@mui/icons-material/Description";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const navItems: { text: string; icon: React.ReactElement; path: string }[] = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "All Users", icon: <PeopleIcon />, path: "/dashboard/all-users" },
  {
    text: "Subscribed Users",
    icon: <GroupAddIcon />,
    path: "/dashboard/subscribed-users",
  },
  {
    text: "Subscription Plan",
    icon: <SubscriptionsIcon />,
    path: "/dashboard/subscription-plan",
  },
  {
    text: "Features",
    icon: <FormatListBulletedIcon />,
    path: "/dashboard/features",
  },
  {
    text: "Terms & Conditions",
    icon: <DescriptionIcon />,
    path: "/dashboard/terms-and-conditions",
  },
  { text: "Privacy Policy", icon: <PrivacyTipIcon />, path: "/dashboard/privacy-policy" },
];
