import os
import random
import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.service import Service

from dotenv import load_dotenv

DRIVERS = {'chrome': "/Users/mentelis/Downloads/chromedriver_mac64/chromedriver",
           'firefox': "/Users/mentelis/Downloads/geckodriver"}


class MyTestCase(unittest.TestCase):
    def setUp(self):
        load_dotenv()
        self.driver_path = DRIVERS['chrome']

        options = webdriver.ChromeOptions()
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option("useAutomationExtension", False)
        service = Service(self.driver_path)

        self.driver = webdriver.Chrome(service=service, options=options)
        self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

        self.driver.get("http://localhost:3000/")
        assert "React" in self.driver.title

    def test_login(self):
        main_window = self.driver.current_window_handle
        self.driver.find_element(By.ID, "google login").click()

        WebDriverWait(self.driver, 3).until(lambda driver: len(driver.window_handles) > 1)
        new_window = [handle for handle in self.driver.window_handles if handle != main_window][0]
        self.driver.switch_to.window(new_window)

        email_input = WebDriverWait(self.driver, 15).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="identifierId"]')))
        email_input.send_keys(os.environ["USER_MAIL"])
        self.driver.find_elements(By.ID, "identifierNext")[0].click()
        password_input = WebDriverWait(self.driver, 15).until(
            EC.element_to_be_clickable((By.XPATH, '//input[@type="password"]')))
        password_input.send_keys(os.environ["USER_PASSWORD"])
        WebDriverWait(self.driver, 15).until(
            EC.element_to_be_clickable((By.XPATH, '//*[@id="passwordNext"]'))).click()
        self.driver.switch_to.window(main_window)
        google_logo = WebDriverWait(self.driver, 15).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div[1]/div')))
        assert "tt" in google_logo.text

    def test_read_more_button(self):
        elem = self.driver.find_element(By.ID, "read more")
        elem.click()
        assert "chapter" in self.driver.current_url

    def test_home_page_button(self):
        self.driver.find_element(By.ID, "read more").click()
        elem = self.driver.find_element(By.ID, "home page")
        elem.click()
        assert self.driver.current_url == "http://localhost:3000/"
        self.close_driver()

    def test_comment_post(self):
        text = "This is a test comment"
        self.driver.find_element(By.ID, "read more").click()
        elem = self.driver.find_element(By.ID, "comment")
        elem.send_keys(text)
        elem = self.driver.find_element(By.ID, "add-comment-btn")
        elem.click()
        assert text in self.driver.page_source

    # def test_comment_edit(self):
    #     text = "This is an edited test comment"

    # def test_comment_delete(self):

    def close_driver(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
