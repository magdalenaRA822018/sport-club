import { Column, MainPage, MainMenuBar, ChatContainer, ToolsBar, ThreadMenuItems } from "./styled-components/Column";
import {  BottomContainer, HeaderBar, SecondaryHeaderBar, SelectorFrame,SelectorTitleFrame, ThreadMenuItem,SecondaryHeaderBarSelectorFrame,SecondaryHeaderBarSelector } from "./styled-components/Row";
import { SearchBarFrame, SearchBar } from "./search-bar/search-bar";
const Dashboard = () => {
   
    return (
        <MainPage>
          <HeaderBar>
            <SearchBarFrame value={"Search creative direction A24"} >
            </SearchBarFrame>
          </HeaderBar>
          <SecondaryHeaderBar>

            <SecondaryHeaderBarSelectorFrame></SecondaryHeaderBarSelectorFrame>
            <SecondaryHeaderBarSelector>SALES & MARKETING</SecondaryHeaderBarSelector>
          </SecondaryHeaderBar>
          <BottomContainer>
           <MainMenuBar>
            <SelectorFrame>
                <SelectorTitleFrame>THREADS</SelectorTitleFrame>
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.347933 2.45909L6.06367 8.17483C6.28084 8.38348 6.57033 8.5 6.87149 8.5C7.17266 8.5 7.46214 8.38348 7.67931 8.17483L13.3036 2.45909C14.3362 1.40739 12.7206 -0.208262 11.6879 0.839623L6.06367 6.55537H7.67169L1.95595 0.839623C0.915685 -0.200641 -0.711391 1.41501 0.340305 2.45909H0.347933Z" fill="white"/></svg>
            </SelectorFrame>
            <ThreadMenuItems>
                <ThreadMenuItem>General</ThreadMenuItem>
                <ThreadMenuItem>Design</ThreadMenuItem>
                <ThreadMenuItem>Sales & marketing</ThreadMenuItem>
                <ThreadMenuItem>+ Create new thread</ThreadMenuItem>
            </ThreadMenuItems>
           </MainMenuBar>
           <ChatContainer></ChatContainer>
           <ToolsBar></ToolsBar>
          </BottomContainer>
        </MainPage>
    );
};
  
export default Dashboard;