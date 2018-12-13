import React from "react";
import { View, Image } from "react-native";
import TGText from "../shared/TGText";
import styles, { colors } from "../../styles";
const mutedYellow = { backgroundColor: colors.mutedYellow };
const defaultPhoto = require("../../images/defaultavatar.png");
const getItemName = (teamEvent, player) => {
  if (!teamEvent) {
    return `${player.firstName} ${player.lastName.substr(0, 1)}`;
  }
  return player.users.map(u => u.firstName).join(", ");
};
const isCurrentUser = (teamEvent, player, currentUserId) => {
  if (teamEvent) {
    return player.users.find(p => p.id === currentUserId);
  }
  return player.id === currentUserId;
};
type ScoringLeaderboardCardProps = {
  player: {
    holes: any,
    strokes: any,
    points: any,
    beerPos?: any,
    id: any,
    krPos?: any,
    position: any,
    photo?: {
      url: any
    },
    firstName?: any,
    lastName?: any,
    users?: string[]
  },
  currentUserId: any,
  sorting: any,
  scoringType: any,
  teamEvent: any
};
const ScoringLeaderboardCard: React.SFC<ScoringLeaderboardCardProps> = ({
  player,
  currentUserId,
  sorting,
  scoringType,
  teamEvent
}) => {
  let pointText;
  let pointValue = "";
  let position;
  const strokePlay = scoringType === "strokes";
  if (sorting === "beers") {
    pointValue = player.beers;
    pointText = "🍺";
    position = player.beerPos;
  } else if (sorting === "kr") {
    pointValue = player.kr - player.kr * 2;
    pointText = "kr";
    position = player.krPos;
  } else {
    pointValue = strokePlay ? player.calculatedStrokes : player.points;
    pointText = strokePlay ? "" : "p";
    position = player.position;
  }
  const currentUserStyle = isCurrentUser(teamEvent, player, currentUserId)
    ? mutedYellow
    : null;
  const photoUrl = player.photo ? player.photo.url : null;
  const itemName = getItemName(teamEvent, player);
  return (
    <View
      key={player.id}
      style={[styles.listrow, currentUserStyle, { paddingHorizontal: 20 }]}
    >
      <View style={styles.position}>
        <TGText
          style={{
            flex: 1,
            fontWeight: "800",
            color: colors.dark,
            fontSize: 16
          }}
        >
          {position}
        </TGText>
      </View>
      {!teamEvent ? (
        <Image
          style={styles.cardImage}
          source={photoUrl ? { uri: photoUrl } : defaultPhoto}
          resizeMode="cover"
        />
      ) : null}
      <View style={styles.cardTitle}>
        <TGText style={styles.name}>{itemName}</TGText>
      </View>
      {sorting === "totalPoints" ? (
        <TGText style={[styles.points, { color: colors.gray }]}>
          {player.strokes}
        </TGText>
      ) : null}
      <TGText
        style={[styles.points, { paddingRight: 10 }]}
      >{`${pointValue} ${pointText}`}</TGText>
    </View>
  );
};
export default ScoringLeaderboardCard;
