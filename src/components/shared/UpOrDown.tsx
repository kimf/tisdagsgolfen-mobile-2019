import React from "react";
import TGText from "./TGText";
import { colors } from "../../styles";
type UpOrDownProps = {
  prev: any,
  current: any
};
const UpOrDown: React.SFC<UpOrDownProps> = ({ prev, current }) => {
  if (current < prev) {
    return (
      <TGText style={{ fontSize: 12, flex: 1, color: colors.green }}>
        ↥{prev - current}
      </TGText>
    );
  }
  return (
    <TGText style={{ fontSize: 12, flex: 1, color: colors.red }}>
      ↧{current - prev}
    </TGText>
  );
};
export default UpOrDown;
