from nicegui import ui
import sqlite3

con = sqlite3.connect("ShoppingList.db")
cur = con.cursor()

get_id = ui.label()
def itemEnter(item, quantity, unit, comment):
    try:
        if item=='':
            ui.notify("Item cannot be empty")
        else:
            cur.execute("INSERT INTO items(itemName, quantity, unit, comment) VALUES(?, ?, ?, ?)", (item, quantity,  unit, comment))
            con.commit()
            ui.notify(f'Successfully added {int(quantity)} {item}')
            list_alldata.clear()
            getData()
    except:
        ui.notify("Entered items must be unique")
with ui.row():
    with ui.card():
        label = ui.label('Shopping List')
        with ui.column():
            with ui.row():
                textInput = ui.input(label='Text', placeholder='item name',
                     validation={'Input too long': lambda value: len(value) < 25})
                quantityInput = ui.number(label="Quantity",format='%d', value=1)
                unitInput = ui.input(label='Unit', placeholder='unit')
                commentInput = ui.input(label='Insert any comments', placeholder='comments')
                ui.button("Enter Item", on_click=lambda e: itemEnter(textInput.value, quantityInput.value, unitInput.value, commentInput.value))
    with ui.column():
        picker = ui.color_picker(on_pick=lambda e: ui.colors(primary =  e.color))
        button = ui.button(text = 'Set Color Theme', on_click=picker.open)

def editData():
    pass

def deleteData(data):
    cur.execute('delete from items where itemName = ?', [data.text])
    con.commit()
    list_alldata.clear()
    getData()
list_alldata = ui.column()
def getData():
        cur.execute('select * from items')
        res = cur.fetchall()
        result = []
        for row in res:
            data = {}
            for i, col in enumerate(cur.description):
                data[col[0]] = row[i]
            result.append(data)
        for x in result:
            with list_alldata:
                with ui.card():
                    with ui.column():
                        with ui.row().classes("justify between w-full"):
                            labelData =ui.label(x['itemName'])
                        with ui.row():
                            ui.label(x['quantity'])
                            ui.label(x['unit'])
                            with ui.expansion(text='',icon='info'):
                                ui.label(x['comment'])
                            ui.button(on_click=lambda e, labelData = labelData: deleteData(labelData)).props('icon=delete_forever')
 
getData()

ui.run(port=80, title='Shopping List')
