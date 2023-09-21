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
    public class Appointment_DetailsService
    {
        private readonly Appointment_DetailsRepository appDetailsRepository;

        private readonly Test_DetailsRepository test_DetailsRepository;

        private readonly Patholabs_ExpressModel context;
        public Appointment_DetailsService()
        {
            context = new Patholabs_ExpressModel();
            appDetailsRepository = new Appointment_DetailsRepository();
            test_DetailsRepository = new Test_DetailsRepository();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public bool Add(Appointment_DetailsDto dto)
        {
            var user = new Appointment_Details { TestId = dto.TestId, CustomerName = dto.CustomerName, Email = dto.Email, App_Book_Time = DateTime.Now, App_Date_Time = dto.App_Date_Time, Status = dto.Status, CreatorUserId = dto.CreatorUserId };
            return appDetailsRepository.Add(user) == 1;
        }
        public bool Remove(int appointmentId)
        {
            return appDetailsRepository.Remove(appointmentId) == 1;
        }
        public IEnumerable<Appointment_DetailsDto> GetAppDetails(int creatorid)
        {
            var details = appDetailsRepository.GetDetails(creatorid);
            var Dtos = new List<Appointment_DetailsDto>();
            foreach (var item in details)
                Dtos.Add(new Appointment_DetailsDto
                {
                    AppointmentId = item.AppointmentId,
                    TestId = item.TestId,
                    CustomerName = item.CustomerName,
                    App_Book_Time = item.App_Book_Time,
                    Email = item.Email,
                    App_Date_Time = item.App_Date_Time,
                    Status = item.Status,
                    CreatorUserId = item.CreatorUserId
                });
            return Dtos;
        }

        public List<Appointment_DetailsDto> getall()
        {
            try
            {
                var details = appDetailsRepository.Get();
                var Dtos = new List<Appointment_DetailsDto>();
                foreach (var item in details)
                    Dtos.Add(new Appointment_DetailsDto
                    {
                        AppointmentId = item.AppointmentId,
                        TestId = item.TestId,
                        CustomerName = item.CustomerName,
                        App_Book_Time = item.App_Book_Time,
                        Email = item.Email,
                        App_Date_Time = item.App_Date_Time,
                        Status = item.Status,
                        CreatorUserId = item.CreatorUserId
                    });
                return Dtos;
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

        public bool UpdateAppointment(Appointment_DetailsDto dto)
        {
            var Item = appDetailsRepository.AppItem(dto.AppointmentId);
            Item.App_Date_Time = dto.App_Date_Time;
            Item.CustomerName = dto.CustomerName;
            
            return appDetailsRepository.Update(Item) == 1;
        }

        public List<Test_Details> GetAllSalesData(DateTime fromdate, DateTime todate)
        {
            var AllTestId = getall().Where(T => T.App_Book_Time>=fromdate && T.App_Book_Time<=todate).Select(A=> A.TestId).ToList();
            var AllTestDetails = test_DetailsRepository.Get().Where(B =>AllTestId.Contains(B.TestId)).ToList();
            return AllTestDetails;
        }

        public Appointment_Details GetAppIdDetails(int appid)
        {
            var details = appDetailsRepository.GetAppDetails(appid);
            return details;
        }



    }
}
