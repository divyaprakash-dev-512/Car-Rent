const express = require('express');
const {Register} = require('../controller/authController');
const {login}    = require('../controller/authController');
const {Profile} = require('../controller/authController');
const {getProfile} = require('../controller/authController');
const {getAllUsers} = require('../controller/authController');
const {createBooking} = require('../controller/authController');
const {getBookings} = require('../controller/authController');
const {adminLogin} = require('../controller/authController');
const {contact} = require('../controller/authController');
const {getContact} = require('../controller/authController');
const {subscribe} = require('../controller/authController');
const {getSubscribers} = require('../controller/authController');

const {createBrand,getBrands} = require('../controller/authController');
const {bookingupdate} = require('../controller/authController');
const {updateBookingStatus} = require('../controller/authController');
const {getUserBookings} = require('../controller/authController');
const {deleteSubscriber} = require('../controller/authController');
const {deleteUser} = require('../controller/authController');
const {deleteBrand} = require('../controller/authController');
const {regUserEdit} = require('../controller/authController');
const {RegupDate} =require('../controller/authController');
const {getDashboard} = require('../controller/authController');
const {addTestimonial} = require('../controller/authController');
const {getTestimonials} = require('../controller/authController');
const router = express.Router();

router.post('/signup',Register);
router.post('/posttestimonials',addTestimonial);
router.get('/testimonials',getTestimonials);
router.post('/login',login);
router.put('/profile/:id',Profile);
router.get('/profile/:id', getProfile);
router.get('/reguser',getAllUsers);
router.post('/booking',createBooking);
router.get('/booking',getBookings);
router.post('/adminlogin',adminLogin);
router.post('/contact',contact)
router.get('/contact',getContact);
router.post('/subscribe', subscribe);
router.get('/subscribers', getSubscribers);

router.post('/createbrand',createBrand);
router.get('/brand',getBrands);
router.put('/booking-status/:id',bookingupdate)

router.put("/booking-status/:id", updateBookingStatus);

router.get('/my-bookings/:id',getUserBookings);

router.delete("/subscriberdelete/:id", deleteSubscriber);
router.delete('/deleteUser/:id',deleteUser);
router.delete('/deletebrands/:id',deleteBrand)
router.get('/update-Profiles/:id',regUserEdit)
router.put('/update-Profile/:id',RegupDate);
router.get('/dashboard',getDashboard);
module.exports=router;