import React from "react";
import { View } from "react-native";
import moment from "moment";
import "moment/locale/sv";
import TGText from "../shared/TGText";
import TouchableView from "../shared/TouchableView";
import { eventShape } from "../../propTypes";
import styles from "./eventCardStyles";
type EventCardProps = {
  event: any,
  onNavigate: any
};
const EventCard: React.SFC<EventCardProps> = ({ event, onNavigate }) => {
  let gametypeName = "";
  if (event.scoringType === "modified_points") {
    gametypeName = "Modifierad Poäng";
  } else if (event.scoringType === "points") {
    gametypeName = "Poäng";
  } else {
    gametypeName = "Slag";
  }
  const date = moment(event.startsAt).format("DD");
  const month = moment(event.startsAt)
    .format("MMM")
    .toUpperCase();
  return (
    <TouchableView
      style={styles.eventCard}
      onPress={() => onNavigate("EventResult", { event, title: "Resultat" })}
    >
      <View style={styles.dateBox}>
        <TGText style={styles.date}>{date}</TGText>
        <TGText style={styles.month}>{month}</TGText>
      </View>
      <View style={styles.row}>
        <View style={styles.row}>
          <TGText style={styles.course}>{event.course}</TGText>
          <TGText style={styles.course}>{event.club}</TGText>
        </View>
        <TGText style={styles.gametype}>
          {event.teamEvent ? "Lag" : "Individuellt"}
          {" ↝ "}
          {gametypeName}
        </TGText>
      </View>
    </TouchableView>
  );
};
export default EventCard;
