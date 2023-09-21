using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Patholabs_Express.DataAccess.Entities;

namespace Patholabs_Express.DataAccess.Repository
{
    public class HelpDeskRepository
    {
        private readonly Patholabs_ExpressModel context;
        public HelpDeskRepository()
        {
            context = new Patholabs_ExpressModel();
        }

        public int Add(HelpDesk helpDesk)
        {
            context.helpDesks.Add(helpDesk);
            return context.SaveChanges();
        }

       
    }
}
