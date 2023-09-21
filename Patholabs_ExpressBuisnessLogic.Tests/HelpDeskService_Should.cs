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
    class HelpDeskService_Should
    {
        private HelpDeskService service;
        private HelpDeskDto dto;
        [OneTimeSetUp]
        public void Init()
        {
            service = new HelpDeskService();
            dto = new HelpDeskDto();
        }

        [OneTimeTearDown]
        public void Cleanup()
        {
            service.Dispose();
        }

        [Test]
        public void Add_Issue()
        {
            var feedback = new HelpDeskDto { UserId = 14, Issue="Payment"};
            bool feed = service.Add(feedback);
            var result = true;
            Assert.AreEqual(feed, result);


        }
    }
}
