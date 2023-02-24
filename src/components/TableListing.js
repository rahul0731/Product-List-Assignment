import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';


const columns = [
    {
        width: 60,
        label: 'Product Image',
        image: true,

    },
    {
        width: 60,
        label: 'Product Model',
        dataKey: 'title',

    },

    {
        width: 120,
        label: 'Specification',
        dataKey: 'description',

    },
    {
        width: 30,
        label: 'Brand',
        dataKey: 'brand',
    },
    {
        width: 30,
        label: 'Price',
        dataKey: 'price',
        numeric: true,
    },
    {
        width: 30,
        label: 'Rating',
        dataKey: 'rating',
        numeric: true,
    }

];



const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width, fontWeight: 'bold' }}
                    sx={{
                        backgroundColor: 'background.paper',
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index, row) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={column.numeric || false ? 'right' : 'left'}
                >
                    {row[column.dataKey]}
                    {column.image === true ? <img alt={row.title} border="3" height="100" width="100" src={row.thumbnail} /> : ""}

                </TableCell>
            ))}
        </React.Fragment>
    );
}

const ReactVirtualizedTable = ({ productsDetails }) => {
    const { products } = productsDetails;
    return (
        <Paper style={{ height: 500, width: '100%' }}>

            <TableVirtuoso
                data={products}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />

        </Paper>
    );
}

export default React.memo(ReactVirtualizedTable);