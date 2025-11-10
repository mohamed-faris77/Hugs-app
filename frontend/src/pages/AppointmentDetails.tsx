import { useLocation } from 'react-router-dom';

export default function AppointmentDetails() {
  const location = useLocation();
  const { appointment } = location.state || {};

  if (!appointment) {
    return <div className="p-8 text-center text-gray-500">No appointment details found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Appointment Details</h2>
      <div className="space-y-2">
        <div><span className="font-semibold">Username:</span> {appointment.fullName || appointment.fullname}</div>
        <div><span className="font-semibold">Doctor:</span> {appointment.doctor || 'N/A'}</div>
        <div><span className="font-semibold">Payment Status:</span> {appointment.paymentStatus || 'N/A'}</div>
        <div><span className="font-semibold">Date:</span> {appointment.date}</div>
        <div><span className="font-semibold">Time:</span> {appointment.time}</div>
        <div><span className="font-semibold">Concern:</span> {appointment.concern}</div>
        <div><span className="font-semibold">Language:</span> {appointment.language}</div>
        <div><span className="font-semibold">Email:</span> {appointment.email}</div>
        <div><span className="font-semibold">Phone:</span> {appointment.phoneNumber || appointment.phonenumber}</div>
        <div><span className="font-semibold">Coupon:</span> {appointment.couponCode || appointment.couponcode}</div>
      </div>
    </div>
  );
}
