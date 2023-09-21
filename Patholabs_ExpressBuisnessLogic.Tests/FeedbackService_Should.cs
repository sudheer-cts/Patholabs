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
    [TestFixture]
    class FeedbackService_Should
    {
        private FeedbackService service;
        private FeedbackDto dto;
        [OneTimeSetUp]
        public void Init()
        {
            service = new FeedbackService();
            dto = new FeedbackDto();
        }

        [OneTimeTearDown]
        public void Cleanup()
        {
            service.Dispose();
        }

        [Test]
        public void Add_Feedback()
        {
            var feedback = new FeedbackDto {  FeedBack = "Bad", AppointmentId = 7 };
            bool feed = service.Add(feedback) ;
            var result = true;
            Assert.AreEqual(feed, result);


        }
    }
}
