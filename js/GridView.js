class GridView {
    /**
     *  properties
     *  @param [array] _tableClass - css classes for table
     *  @param [array] data - input data
    **/

    constructor() {
        this._title = '';
        this._titleClasses = [];
        this._tableClasses = [];
        this._elementOutput = 'body';
        this.attributes = [];
    }

    setTitle(title) {
        if (typeof title !== 'string' || title.trim() === '') {
            return false;
        }

        this._title = title.trim();
        return true;
    }

    setTitleClasses(titleClasses) {
        if (!Array.isArray(titleClasses)) { return false }

        this._titleClasses = titleClasses;
        return true;
    }

    setTableClasses(tableClasses) {
        if (!Array.isArray(tableClasses)) { return false }

        this._tableClasses = tableClasses;
        return true;
    }

    setElementOutput(element) {
        if (typeof element !== 'string') { return false }
        if (!document.querySelector(element)) { return false }

        this._elementOutput = element;
        return this._elementOutput;
    }

    appendData(...data) {
        Object.assign(this.data, ...data);
    }

    _createTitle() {
        let header;

        if (this._title) {
            header = document.createElement('h3');
            header.textContent = this._title;
            this._titleClasses.forEach(cssClass => header.classList.add(cssClass));
        }

        return header;
    }

    _createTableHeader() {
        const trHeader = document.createElement('tr');

        for (let key in this.attributes) {
            const th = document.createElement('th');
            if (this.attributes[key].label) {
                th.textContent = this.attributes[key].label
            } else {
                th.textContent = key;
            }

            trHeader.append(th);
        }

        return trHeader
    }

    _createTable() {
        this._table = document.createElement('table');
        const trHeader = this._createTableHeader();

        this._tableClasses.forEach(cssClass => {
            this._table.classList.add(cssClass);
        })

        this._table.append(trHeader);

        this.data.forEach( item => {
            const dataObj = item;
            const tr = document.createElement('tr');
            
            for (const key in this.attributes) {
                const td = document.createElement('td');
                let value = dataObj[key];

                if (this.attributes[key].value) {
                    value = this.attributes[key].value(dataObj);
                } 

                if (this.attributes[key].html) {
                    td.innerHTML = value;
                } else {
                    td.textContent = value;
                }

                tr.append(td);
            }

            this._table.append(tr);
        })

        return this._table;
    }

    render() {
        const tableWrap = document.querySelector(this._elementOutput)
        const tableTitle = this._createTitle();
        const tableBody = this._createTable();
        
        tableTitle ? tableWrap.append(tableTitle) : () => {};
        tableBody ? tableWrap.append(tableBody) : () => {};
    }
}