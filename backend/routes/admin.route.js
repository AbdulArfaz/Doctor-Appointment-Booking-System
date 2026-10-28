import express from 'express'
import { addDoctor,logoutAdmin,adminAppointmentCancel,adminDashboard,allDoctorsList,appointmentsAdmin,loginAdmin } from '../controllers/admin.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import  authAdmin  from '../middlewares/authAdmin.middleware.js'
import { changeAvailability } from '../controllers/doctor.controller.js'

const adminRouter = express.Router()

adminRouter.get("/verify-session", authAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    role: "admin",
  });
});
adminRouter.post('/add-doctor',authAdmin,upload.single('image') ,addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/logout',logoutAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctorsList)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,adminAppointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)



export default adminRouter
