import "./App.css";
import { useState, createContext, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/layout";
import { Divider, Show } from "@chakra-ui/react";
import NavBar from "./component/NavBar";
import MainDisplay from "./component/MainDisplay";
import ListActions from "./component/ListActions";
import apiClient from "./services/http-client";

export interface ExcelShape {
  id: string;
  site: string;
  date: string;
  date_applied_to: string;
  company_name: string;
  position: string;
  fulltime_Contract: string;
  salary: string;
  company_website: string;
  contact_info: string;
  call_back_date: string;
  tech_stack: string;
  round_1: string;
  round_2: string;
  round_3: string;
  final: string;
  notes: string;
}

export const ExcelContext = createContext([] as ExcelShape[]);

function App() {
  const [excelData, setExcelData] = useState<ExcelShape[]>([] as ExcelShape[]);
  const [filterClick, setFilterClick] = useState<boolean>(false);
  const [filterVal, setFilterVal] = useState("");
  const [showAllToggle, setShowAllToggle] = useState(false);

  //search by company name
  useEffect(() => {
    if (filterClick && filterVal.length > 0) {
      apiClient
        .get(`/api/v1/applications/query?company_name=${filterVal}`)
        .then((response) => setExcelData(response.data.data))
        .catch((error) => console.log(error));
    }
    setFilterClick(false);
  }, [filterClick, filterVal]);

  //initial render
  useEffect(() => {
    apiClient
      .get("/api/v1/applications")
      .then((response) => setExcelData(response.data.data))
      .catch((error) => new Error(error));
  }, []);

  //on show all button
  useEffect(() => {
    apiClient
      .get("/api/v1/applications")
      .then((response) => setExcelData(response.data.data))
      .catch((error) => new Error(error));
  }, [showAllToggle]);

  const onShowAll = () => {
    setShowAllToggle(!showAllToggle);
  };

  const update = (value: string) => {
    setFilterVal(value);
  };

  return (
    <ExcelContext.Provider value={excelData}>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 2fr",
        }}>
        {/* Nav */}
        <GridItem as="nav" height="100px">
          <NavBar />
        </GridItem>
        {/* Aside */}
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <ListActions />
          </GridItem>
        </Show>
        {/* Main */}
        <GridItem overflow="hidden" area="main" height="500vh" marginTop="-4px">
          <Divider borderColor="gray.200" />
          <MainDisplay
            toggleShowAll={onShowAll}
            filterValue={(data) => update(data)}
            setFilterButton={setFilterClick}
          />
        </GridItem>
      </Grid>
    </ExcelContext.Provider>
  );
}

export default App;
