# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import time
from django.test import TestCase, LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
# Create your tests here.

class RegisterTestCase(LiveServerTestCase):

    def setUp(self):
        options = Options()
        options.binary_location = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
        chrome_driver_binary = "C:\Windows\chromedriver"
        self.selenium = webdriver.Chrome(chrome_driver_binary, chrome_options=options,)
        super(RegisterTestCase, self).setUp()

    def tearDown(self):
        self.selenium.quit()
        super(RegisterTestCase, self).tearDown()

    def test_register(self):
        selenium = self.selenium
        #link
        selenium.get('http://localhost:8080/register')
        #find form element
        wait(selenium, 10).until(EC.presence_of_element_located((By.ID, "full_name")))

        full_name = selenium.find_element_by_id('full_name')
        #full_name.click()
        #full_name.click()
        username = selenium.find_element_by_id('username')
        email = selenium.find_element_by_id('email')
        passwordOne = selenium.find_element_by_id('passwordOne')
        passwordTwo = selenium.find_element_by_id('passwordTwo')

        submit = selenium.find_element_by_id('submit')

        full_name.send_keys('Bob bob')
        time.sleep(1000)
        username.send_keys('BoBoB')
        time.sleep(1)
        email.send_keys('Bob@bob.com')
        time.sleep(1)
        passwordOne.send_keys('asd12345')
        time.sleep(1)
        passwordTwo.send_keys('asd12345')
        time.sleep(1)

        submit.click()
