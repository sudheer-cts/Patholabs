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
    public class HelpDeskService:IDisposable
    {
        private readonly HelpDeskRepository helpDeskRepository;



        private readonly Patholabs_ExpressModel context;
        public HelpDeskService()
        {
            context = new Patholabs_ExpressModel();
            helpDeskRepository = new HelpDeskRepository();
        }


        public void Dispose()
        {
            context.Dispose();
        }


        public bool Add(HelpDeskDto dto)
        {
            try
            {
               

                    var help = new HelpDesk { Id = dto.Id, UserId = dto.UserId, Issue = dto.Issue };
                    return helpDeskRepository.Add(help) == 1;
                
                
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
