using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using Patholabs_Express.BuisnessLogic.DTOs;
using Patholabs_Express.BuisnessLogic.Services;

namespace Patholabs_ExpressBuisnessLogic.Tests
{
    class Appointment_DetailsService_Should
    {
        private Appointment_DetailsService service;
        private Appointment_DetailsDto dto;
        [OneTimeSetUp]
        public void Init()
        {
            service = new Appointment_DetailsService();
            dto = new Appointment_DetailsDto();
        }

        [OneTimeTearDown]
        public void Cleanup()
        {
            service.Dispose();
        }

        [Test]
        public void Add_New_Appointment()
        {
            var feedback = new Appointment_DetailsDto { TestId = 2, CustomerName="Apoorv", Email="apoorvvv@gmail.com",App_Book_Time=DateTime.Now, App_Date_Time=DateTime.Now, Status=true, CreatorUserId=1 };
            bool feed = service.Add(feedback);
            var result = true;
            Assert.AreEqual(feed, result);


        }

        [Test]
        public void Cancel_Appointment()
        {
            bool app = service.Remove(1);
            var result = true;
            Assert.AreEqual(result, app);
        }

        [Test]
        public void Return_Appointment_Details()
        {
            var app = service.GetAppDetails(1);

            CollectionAssert.IsNotEmpty(app);
        }
    }
}


