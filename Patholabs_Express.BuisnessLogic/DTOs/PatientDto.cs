using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patholabs_Express.BuisnessLogic.DTOs
{
    public class PatientDto
    {
       
        public int UserId { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public int? Age { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }


        public string Contact_No { get; set; }
        
    }
}
