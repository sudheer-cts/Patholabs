using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patholabs_Express.BuisnessLogic.DTOs
{
    public class HelpDeskDto
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
       
        [StringLength(300)]
        public string Issue { get; set; }

    }
}
