# it would be probably easier (and recommended) to use famous pandas lib, but I wanted to try with the native csv

import csv

ORDERS_PATH = 'orders.csv'
PRODUCTS_PATH = 'products.csv'
ORDER_PRICES_PATH = 'order_prices.csv'

ID_COL = 'id'
COST_COL = 'cost'
TOTAL_COL = 'euros'
PRODUCTS_LIST_COL = 'products'

with open(ORDERS_PATH,'r') as o, open(PRODUCTS_PATH,'r') as p, open(ORDER_PRICES_PATH,'w',newline='') as op:
    orders = csv.DictReader(o)
    products = csv.DictReader(p)

    productsd = {int(row.pop(ID_COL)): row for row in products}

    data = []

    for order in orders:
        sum = 0
        for pid in order[PRODUCTS_LIST_COL].split(' '):
            sum += float(productsd[int(pid)][COST_COL])
        data.append({ID_COL: order[ID_COL], TOTAL_COL: sum})

    order_prices = csv.DictWriter(op, [ID_COL,TOTAL_COL])
    order_prices.writeheader()
    order_prices.writerows(data)