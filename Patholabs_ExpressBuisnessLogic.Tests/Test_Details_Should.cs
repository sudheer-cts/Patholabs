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
    class Test_Details_Should
    {

        private Test_DetailsService service;
        private Test_DetailsDto dto;
        [OneTimeSetUp]
        public void Init()
        {
            service = new Test_DetailsService();
            dto = new Test_DetailsDto();
        }

        [OneTimeTearDown]
        public void Cleanup()
        {
            service.Dispose();
        }

        [Test]
        public void Return_All_Test()
        {
            var user = service.getall();
            CollectionAssert.IsNotEmpty(user);

        }

        [Test]
        public void Add_Test()
        {
            var feedback = new Test_DetailsDto { TestId=30, TestName = "Payment", TestPrice=600 };
            bool feed = service.Add(feedback);
            var result = true;
            Assert.AreEqual(feed, result);


        }

        [Test]
        public void Update_Test()
        {
            var test = new Test_DetailsDto { TestId = 2, TestPrice = 100 };
            bool log = service.UpdateTest(test);
            var result = true;
            Assert.AreEqual(log, result);
        }




    }
}
