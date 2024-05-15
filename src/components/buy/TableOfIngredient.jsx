import {
    Badge,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from '@tremor/react';

export default function TableOfIngredient({data}) {
  return (
    <Card className="bg-white rounded-lg border-2 border-black">
      <Table className="mt-5">
        <TableHead>
          <TableRow className="font-bold text-base text-black">
            <TableHeaderCell>Receta</TableHeaderCell>
            <TableHeaderCell>Ingredientes</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Badge>
                  <span className="text-lg">{item.ingredients}</span>
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
