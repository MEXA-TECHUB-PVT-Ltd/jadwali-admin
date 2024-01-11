import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group"; // Updated for All Users
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"; // Updated for Subscribed Users
import EventIcon from "@mui/icons-material/Event";
import PaymentIcon from "@mui/icons-material/Payment";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined"; // Updated to LightbulbOutlined
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // or LiveHelpIcon
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"; // or ContactSupportIcon
import GavelIcon from "@mui/icons-material/Gavel"; // or stick with DescriptionIcon
import LockIcon from "@mui/icons-material/Lock"; // Updated for Privacy Policy

export const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "All Users", icon: <GroupIcon />, path: "/dashboard/all-users" },
  // {
  //   text: "Subscribed Users",
  //   icon: <VerifiedUserIcon />,
  //   path: "/dashboard/subscribed-users",
  // },
  {
    text: "Subscription Plan",
    icon: <PaymentIcon />,
    path: "/dashboard/subscription-plan",
  },
  {
    text: "Features",
    icon: <LightbulbOutlinedIcon />,
    path: "/dashboard/features",
  },
  {
    text: "Event Payments",
    icon: <EventIcon />,
    path: "/dashboard/event-payments",
  },
  {
    text: "Feedbacks",
    icon: <FeedbackIcon />,
    path: "/dashboard/feedbacks",
  },
  {
    text: "FAQs",
    icon: <HelpOutlineIcon />,
    path: "/dashboard/faq",
  },
  {
    text: "Queries",
    icon: <QuestionAnswerIcon />,
    path: "/dashboard/queries",
  },
  {
    text: "Terms & Conditions",
    icon: <GavelIcon />,
    path: "/dashboard/terms-and-conditions",
  },
  {
    text: "Privacy Policy",
    icon: <LockIcon />,
    path: "/dashboard/privacy-policy",
  },
];
