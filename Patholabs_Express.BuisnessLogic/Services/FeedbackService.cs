using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Patholabs_Express.BuisnessLogic.DTOs;
using Patholabs_Express.DataAccess;
using Patholabs_Express.DataAccess.Entities;
using Patholabs_Express.DataAccess.Repository;

namespace Patholabs_Express.BuisnessLogic.Services
{
    public class FeedbackService:IDisposable
    {
        private readonly FeedbackRepository feedbackRepository;



        private readonly Patholabs_ExpressModel context;
        public FeedbackService()
        {
            context = new Patholabs_ExpressModel();
            feedbackRepository = new FeedbackRepository();
        }


        public void Dispose()
        {
            context.Dispose();
        }


        public bool Add(FeedbackDto dto)
        {
            try
            {
                if (!feedbackRepository.Exists(dto.AppointmentId))
                {

                    var feed = new Feedback { Id = dto.Id, FeedBack = dto.FeedBack, AppointmentId = dto.AppointmentId };
                    return feedbackRepository.Add(feed) == 1;
                }
                else
                {
                    return false;
                }
            }

            catch (System.Data.Common.DbException ex)
            {
                throw new Patholabs_ExpressException("Error reading data", ex);
            }

            catch (Exception ex)
            {
                throw new Patholabs_ExpressException("Unknown error while reading User Admin data", ex);
            }
        }
    }
}
