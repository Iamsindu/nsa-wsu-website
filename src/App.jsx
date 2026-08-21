import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Constitution from "./pages/Constitution"
import Team from "./pages/Team"
import Events from "./pages/Events"
import Contact from "./pages/Contact"
import "./App.css"
import Updates from "./pages/Updates"
import NewsDetail from "./pages/UpdateDetails"
import EventDetail from "./pages/EventDetails"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import ProtectedRoute from "./pages/admin/ProtectedRoute"
import AdminLayout from "./components/admin/AdminLayout"
import PublicLayout from "./components/PublicLayout"
import RoleProtectedRoute from "./components/admin/RoleProtectedRoute"
import ManageUpdates from "./pages/admin/ManageUpdates"
import AdminUpdateForm from "./pages/admin/AdminUpdateForm"
import ManageTeam from "./pages/admin/ManageTeam"
import {
  ABOUT,
  ADMIN,
  ADMIN_DASHBOARD,
  ADMIN_LOGIN,
  ADMIN_TEAM,
  ADMIN_UPDATE_NEW,
  ADMIN_UPDATES,
  CONSTITUTION,
  CONTACT,
  EVENT_DETAILS,
  EVENTS,
  HOME,
  TEAM,
  UPDATE_DETAILS,
  UPDATES
} from "./constants/route"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path={HOME} element={<Home />} />
          <Route path={ABOUT} element={<About />} />
          <Route path={CONSTITUTION} element={<Constitution />} />
          <Route path={TEAM} element={<Team />} />
          <Route path={UPDATES} element={<Updates />} />
          <Route path={UPDATE_DETAILS} element={<NewsDetail />} />
          <Route path={EVENTS} element={<Events />} />
          <Route path={EVENT_DETAILS} element={<EventDetail />} />
          <Route path={CONTACT} element={<Contact />} />
        </Route>

        <Route path={ADMIN_LOGIN} element={<AdminLogin />} />
        <Route
          path={ADMIN}
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ADMIN_UPDATES} element={<ManageUpdates />} />
          <Route path={ADMIN_UPDATE_NEW} element={<AdminUpdateForm />} />


          <Route
            path="updates/:id/edit"
            element={<AdminUpdateForm />}
          />
          <Route
            path={ADMIN_TEAM}
            element={
              <RoleProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
                <ManageTeam />
              </RoleProtectedRoute>
            }
          />

          {/* <Route path="events" element={<ManageEvents />} /> */}
          {/* <Route path="gallery" element={<ManageGallery />} /> */}
          {/* <Route path="team" element={<ManageTeam />} /> */}
          {/* <Route path="constitution" element={<ManageConstitution />} /> */}
          {/* <Route path="admins" element={<ManageAdmins />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App