"""
    @auyhor: 欢乐干饭人小组
    @content: 主程序
    @time: 2022.12.15
"""

import time
from flask import Flask
from flask import render_template
import china_people, province_people_area, news_mingzheng
import sql_select

app = Flask(__name__)

# 调用爬虫数据函数
if __name__ == "__main__":
    print("===========china_people.spiders_china_people===========")
    slc = china_people.spiders_china_people()
    return_html = slc.imitate_click()
    startTime = time.time()
    print("--------开始时间(解析页面):", startTime, "---------")
    return_item_row = slc.parse_col(return_html)
    return_items = slc.parse_page(return_html)
    slc.save_file(return_items, return_item_row)
    print("--------CSV数据解析完成，花费:", time.time() - startTime, "---------")
    slc.save_mysql(return_items)
    print("--------MySQL数据解析完成，花费:", time.time() - startTime, "---------")

    print("===========province_people_area.spiders_province_people_area===========")
    slc = province_people_area.spiders_province_people_area()
    return_base_url = slc.imitate_click()
    return_year_list = slc.input_year()
    return_htmls = slc.load_page(return_base_url, return_year_list)
    startTime = time.time()
    print("--------开始时间(解析页面):", startTime, "---------")
    return_item_row = slc.parse_col(return_htmls)
    return_items = slc.parse_page(return_htmls, return_year_list)
    slc.save_file(return_items, return_item_row)
    print("--------CSV数据解析完成，花费:", time.time() - startTime, "---------")
    slc.save_mysql(return_items)
    print("--------MySQL数据解析完成，花费:", time.time() - startTime, "---------")

    print("===========province_people_area.spiders_province_people_area===========")
    slc = news_mingzheng.spiders_news_mzb()
    return_base_url = slc.imitate_click()
    return_page_list = slc.input_year()
    return_htmls = slc.load_page(return_base_url, return_page_list)
    startTime = time.time()
    print("--------开始时间(解析页面):", startTime, "---------")
    return_item_row = ["新闻"]
    return_items = slc.parse_page(return_htmls)
    slc.save_file(return_items, return_item_row)
    print("--------CSV数据解析完成，花费:", time.time() - startTime, "---------")
    slc.save_mysql(return_items)
    print("--------MySQL数据解析完成，花费:", time.time() - startTime, "---------")

# 获取数据库查询结果，返回结果给前端
@app.route('/')
def hello_people():
    slc = sql_select.sql_select()
    return_new_content_recording_list = slc.select1(slc.conn)
    return_new_content_recording_list_2020 = slc.select2(slc.conn)
    return_new_content_recording_list_gs = slc.select3(slc.conn)
    return_new_content_recording_list_china = slc.select4(slc.conn)
    return_new_content_recording_list_news = slc.select5(slc.conn)

    return render_template("index.html", new_content_recording_list=return_new_content_recording_list,
            new_content_recording_list_2020=return_new_content_recording_list_2020,
            new_content_recording_list_gs=return_new_content_recording_list_gs,
            new_content_recording_list_china=return_new_content_recording_list_china,
            new_content_recording_list_news=return_new_content_recording_list_news
    )

app.run(port=8080)