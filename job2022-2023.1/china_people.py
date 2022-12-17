"""
    @auyhor: 欢乐干饭人小组
    @content: 爬取国家历年数据
    @time: 2022.12.15
"""

import pandas as pd
import pymysql
from lxml import etree
from selenium import webdriver
import time

class spiders_china_people(object):
    # 模仿浏览器点击
    def imitate_click(self):
        dr = webdriver.Chrome()
        dr.get("https://www.baidu.com/")
        print("--------进入百度---------")
        dr.save_screenshot("../results/Screenshot/img1.png")
        # 通过链id定位页面元素
        print("--------输入关键字(聚汇数据)---------")
        dr.find_element_by_id("kw").send_keys(u"聚汇数据")
        print("--------点击(百度一下)---------")
        dr.find_element_by_id("su").click()
        time.sleep(2)
        dr.save_screenshot("../results/Screenshot/img2.png")
        # 通过链接文本定位页面元素
        print("--------点击进入(聚汇数据_城市房价及宏观数据查询平台)---------")
        dr.find_element_by_link_text("聚汇数据_城市房价及宏观数据查询平台").click()
        # 获取当前窗口的句柄
        handles = dr.window_handles
        # 切换至新打开的标签
        dr.switch_to.window(handles[1])
        time.sleep(2)
        dr.save_screenshot("../results/Screenshot/img3.png")
        print("--------点击进入(人口)---------")
        dr.find_element_by_xpath("//div[@class='class-group elib-class-group elib-class ic-group']/a[2]").click()
        dr.save_screenshot("../results/Screenshot/img4.png")
        html = dr.page_source
        dr.close()
        dr.quit()
        return html

    # 解析列名数据
    def parse_col(self, html):

        root = etree.HTML(html)

        time = root.xpath("//table[@class='ntable table-striped table-hover']//th[1]")
        population = root.xpath("//table[@class='ntable table-striped table-hover']//th[2]/div")
        birth_rate = root.xpath("//table[@class='ntable table-striped table-hover']//th[3]/div")
        growth_rate = root.xpath("//table[@class='ntable table-striped table-hover']//th[4]/div")
        old_proportion = root.xpath("//table[@class='ntable table-striped table-hover']//th[5]/div")
        kid_proportion = root.xpath("//table[@class='ntable table-striped table-hover']//th[6]/div")
        man_proportion = root.xpath("//table[@class='ntable table-striped table-hover']//th[7]/div")
        woman_proportion = root.xpath("//table[@class='ntable table-striped table-hover']//th[8]/div")

        item_row = []

        item_row.append(time[0].text)
        try:
            item_row.append(population[0].text+population[1].text)
        except IndexError:
            pass
        try:
            item_row.append(birth_rate[0].text+birth_rate[1].text)
        except IndexError:
            pass
        try:
            item_row.append(growth_rate[0].text+growth_rate[1].text)
        except IndexError:
            pass
        try:
            item_row.append(old_proportion[0].text+old_proportion[1].text)
        except IndexError:
            pass
        try:
            item_row.append(kid_proportion[0].text+kid_proportion[1].text)
        except IndexError:
            pass
        try:
            item_row.append(man_proportion[0].text+man_proportion[1].text)
        except IndexError:
            pass
        try:
            item_row.append(woman_proportion[0].text+woman_proportion[1].text)
        except IndexError:
            pass

        return item_row

    # 解析网页数据
    def parse_page(self, html):

        root = etree.HTML(html)

        time = root.xpath("//table[@class='ntable table-striped table-hover']//td/a")
        population = root.xpath("//table[@class='ntable table-striped table-hover']//td[2]")
        birth_rate = root.xpath("//table[@class='ntable table-striped table-hover']//td[3]")
        growth_rate = root.xpath("//table[@class='ntable table-striped table-hover']//td[4]")
        old_proportion = root.xpath("//table[@class='ntable table-striped table-hover']//td[5]")
        kid_proportion = root.xpath("//table[@class='ntable table-striped table-hover']//td[6]")
        man_proportion = root.xpath("//table[@class='ntable table-striped table-hover']//td[7]")
        woman_proportion = root.xpath("//table[@class='ntable table-striped table-hover']//td[8]")

        # 定义空列表，以保存元素的信息
        items = []
        for i in range(0, len(time)):
            item=[]
            item.append(time[i].text)
            item.append(population[i].text)
            item.append(birth_rate[i].text)
            item.append(growth_rate[i].text)
            item.append(old_proportion[i].text)
            item.append(kid_proportion[i].text)
            item.append(man_proportion[i].text)
            item.append(woman_proportion[i].text)
            items.append(item)
        return items

    # 将数据保存在csv文件中
    def save_file(self, items, item_row):
        test = pd.DataFrame(columns=item_row, data=items)
        # dir = os.getcwd()
        dir = 'D:/Code/PythonCode/spider_job_2022-202.1/results/result'
        test.to_csv(dir + "/china_people.csv", encoding='utf-8-sig')
        print("数据已解析，并保存在" + dir + "路径下的china_people.csv文件中，请前往查看！")

    # 将数据保存在MySQL数据库中
    def save_mysql(self, items):
        print("---------开始连接MySQL---------")
        db = pymysql.connect(host='localhost', user='root', password='root', port=3306, db='sql_spider')
        cur = db.cursor()
        print('---------开始创建表---------')
        sql_drop = "DROP TABLE IF EXISTS china_people;"
        cur.execute(sql_drop)
        sql = "CREATE TABLE china_people(year CHAR(70) NOT NULL, people CHAR(20), birth_rate CHAR(20),growth_rate CHAR(20),old_people CHAR(20),child CHAR(20), man CHAR(20),woman CHAR(20)) CHARSET=utf8 COLLATE utf8_general_ci;"
        cur.execute(sql)
        print("---------china_people表创建成功---------")
        for data in items:
            # print(data)
            sql = 'insert into china_people(year, people, birth_rate, growth_rate,old_people, child, man, woman)values(%s, %s,%s,%s,%s,%s,%s,%s)'
            try:
                cur.execute(sql, data)
            except TypeError:
                pass
        print("---------插入成功---------")
        cur.close()
        db.commit()
        db.close()
        return "数据已解析，并保存在MySQL数据库sql_spider下的china_people表中，请前往查看！"
