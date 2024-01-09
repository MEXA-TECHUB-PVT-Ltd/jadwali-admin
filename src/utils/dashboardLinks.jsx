import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import PaymentIcon from "@mui/icons-material/Payment"; // or CardMembershipIcon
import StarBorderIcon from "@mui/icons-material/StarBorder"; // or NewReleasesIcon
import FeedbackIcon from "@mui/icons-material/Feedback";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // or LiveHelpIcon
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"; // or ContactSupportIcon
import GavelIcon from "@mui/icons-material/Gavel"; // or stick with DescriptionIcon
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";

export const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "All Users", icon: <PeopleIcon />, path: "/dashboard/all-users" },
  {
    text: "Subscribed Users",
    icon: <SubscriptionsIcon />,
    path: "/dashboard/subscribed-users",
  },
  {
    text: "Subscription Plan",
    icon: <PaymentIcon />,
    path: "/dashboard/subscription-plan",
  },
  {
    text: "Features",
    icon: <StarBorderIcon />,
    path: "/dashboard/features",
  },
  {
    text: "Event Payments",
    icon: <StarBorderIcon />,
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
    icon: <PrivacyTipIcon />,
    path: "/dashboard/privacy-policy",
  },
];
