using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patholabs_Express.DataAccess.Entities
{
    public class HelpDesk
    {
        [Key]
        public int Id { get; set; }

        
       
        public int UserId { get; set; }
        public User User { get; set; }
       
        [StringLength(300)]
        public string Issue { get; set; }
        
    }
}
