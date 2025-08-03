import { RouteObject } from "react-router-dom";
import { lazy } from "react";

// Layout
import { SidebarLayout } from "./layouts/SidebarLayout";
import ComingSoon from "./pages/coming-soon/ComingSoon";
import UploadBill from "./pages/upload-bill/UploadBill";
import HospitalServiceSearchDetails from "./pages/hospital_service_search_details/HospitalServiceSearchDetails";

// Lazy-loaded pages/components
const App = lazy(() => import("./App"));
const Data = lazy(() => import("./pages/data/Data"));
const Roadmap = lazy(() => import("./pages/roadmap/roadmap"));
const HospitalSearch = lazy(() => import("./pages/Hospital_service_search/HospitalSearch"));
const Login = lazy(() => import("./pages/auth/login/login"));
const Signup = lazy(() => import("./pages/auth/signup/signup"));
const Account = lazy(() => import("./pages/Account/Account"));
const AddBill = lazy(() => import("./pages/add_bill"));
const Authorized = lazy(() => import("./pages/authorized-account/authorized"));
const RunAudit = lazy(() => import("./pages/audit/RunAudit"));
const AuditFindings = lazy(() => import("./pages/audit/AuditFindings"));
const About = lazy(() => import("./pages/about/about"));
const UploadDocumentPage = lazy(() => import("./pages/add_bill/upload_document"));
const EnterManualData = lazy(() => import("./pages/add_bill/manual_data"));
const Hospitals = lazy(() => import("./pages/hospitals/Hospitals"));
const HospitalDetails = lazy(() => import("./pages/hospital_details/HospitalDetails"));
const AppealOutcomesPage = lazy(() => import("./pages/audit/AppealOutcomes"));
const OldLandingPage = lazy(() => import("./pages/old_landingpage/App"));
const Team = lazy(() => import("./pages/team/Team"));
const PrivacyPolicy = lazy(() => import("./pages/legal/privacy_policy"));
const Security = lazy(() => import("./pages/legal/security"));
const TermsConditions = lazy(() => import("./pages/legal/terms_conditions"));
const Canary = lazy(() => import("./Canary"));

export const appRoutes: RouteObject[] = [
    { path: "/", element: <App /> },
    { path: "/data", element: <Data /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/coming-soon", element: <ComingSoon /> },
    { path: "/upload-bill", element: <UploadBill /> },
    {
        path: "/account",
        element: <SidebarLayout />,
        children: [
            { index: true, element: <Account /> },
            { path: "add-bill", element: <AddBill /> },
            { path: "add-bill/upload-document", element: <UploadDocumentPage /> },
            { path: "add-bill/manual-entry", element: <EnterManualData /> },
            { path: "about", element: <About /> },
            { path: "authorized-account", element: <Authorized /> },
            { path: "run-audit", element: <RunAudit /> },
            { path: "audit-findings", element: <AuditFindings /> },
            { path: "audit/detailed", element: <AppealOutcomesPage /> },
        ],

    },
    { path: "/hospitals", element: <Hospitals /> },
    { path: "/hospital_details", element: <HospitalDetails /> },
    { path: "/hospital_search", element: <HospitalSearch /> },
    { path: "/hospital_service_details", element: <HospitalServiceSearchDetails /> },
    { path: "/roadmap", element: <Roadmap /> },
    { path: "/old_landingpage", element: <OldLandingPage /> },
    { path: "/team", element: <Team /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/security", element: <Security /> },
    { path: "/terms-and-conditions", element: <TermsConditions /> },
    { path: "/data/investor-dataroom", element: <Canary /> },
];