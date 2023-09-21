using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patholabs_Express.DataAccess.Entities
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        [StringLength(300)]
        public string FeedBack { get; set; }
        public int AppointmentId { get; set; }
        public Appointment_Details Appointment_Details { get; set; }
    }
}
