using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Patholabs_Express.DataAccess.Entities;

namespace Patholabs_Express.DataAccess.Repository
{
    public class FeedbackRepository
    {
        private readonly Patholabs_ExpressModel context;
        public FeedbackRepository()
        {
            context = new Patholabs_ExpressModel();
        }

        public int Add(Feedback feedback)
        {
            context.feedbacks.Add(feedback);
            return context.SaveChanges();
        }

        public bool Exists(int appointId)
        {
            return context.feedbacks.Any(item => item.AppointmentId == appointId);
        }

    }
}
