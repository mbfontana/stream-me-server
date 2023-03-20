import { ApiClient, useCurrentAdmin } from "adminjs";
import React, { useEffect, useState } from "react";
import {
  H1,
  H2,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@adminjs/design-system";

export default function Dashboard() {
  const [currentAdmin] = useCurrentAdmin();
  const [resources, setResources] = useState<{ [key: string]: number }>();
  const api = new ApiClient();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const response = await api.getDashboard();
    setResources(response.data);
  };

  return (
    <section style={{ padding: "1.5rem" }}>
      <H1>Welcome back, {currentAdmin?.firstName}!</H1>

      <section style={{ backgroundColor: "#FFF", padding: "1.5rem" }}>
        <H2>Summary</H2>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#FF0043" }}>
              <TableCell style={{ color: "#FFF" }}>Resource</TableCell>
              <TableCell style={{ color: "#FFF" }}>Reecords</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources ? (
              Object.entries(resources).map(([resource, count]) => (
                <TableRow key={resource}>
                  <TableCell>{resource}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </section>
    </section>
  );
}
