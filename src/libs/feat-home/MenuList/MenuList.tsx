import { bind } from "@libs/util-structure";
import styled from "styled-components";
import { useMenuList } from "./useMenuList";

export const MenuList = bind(useMenuList, ({ menu, currentMenuIndex }) => (
  <Contaienr>
    {menu.map(({ name }, index) => (
      <MenuItem key={name} active={currentMenuIndex === index}>
        {name}
      </MenuItem>
    ))}
  </Contaienr>
));

const Contaienr = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const MenuItem = styled.div<{ active: boolean }>`
  font-size: 30px;
  line-height: 1.5;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => (props.active ? "white" : "gray")};
`;
