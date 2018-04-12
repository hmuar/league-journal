import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { entryListPanelColors } from '../../const/colors';

const MAX_MATCHUP_LENGTH = 26;

moment.updateLocale('en', {
  relativeTime: {
    s: 'seconds',
  },
});

const ListItemCont = styled.div`
  margin: 5px 0;
  display: grid;
  cursor: pointer;
  grid-template-columns: 15px auto 70px;
  align-items: center;
  width: 100%;
  height: 36px;
  :hover {
    background-color: ${entryListPanelColors.bgHover};
    color: ${entryListPanelColors.fontHighlight};
  }
  background-color: ${(props) =>
    (props.active ? entryListPanelColors.bgHighlight : 'none')};
  color: ${(props) =>
    (props.active
      ? entryListPanelColors.fontHighlight
      : entryListPanelColors.font)};
`;

const WinIndicator = styled.div`
  background-color: ${entryListPanelColors.winHighlight};
  width: 5px;
  height: 100%;
`;

const LossIndicator = styled.div``;

const EndCont = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
const ChampText = styled.span`
  font-size: 12px;
  font-weight: bold;
`;
const OpponentText = styled.span`
  font-size: 10px;
`;

const KDACont = styled.div`
  font-size: 11px;
  line-height: 11px;
  align-self: end;
  text-align: center;
`;

const DateCont = styled.div`
  font-size: 9px;
  line-height: 11px;
  color: #999;
  align-self: start;
  text-align: center;
  font-style: italic;
`;

const Matchup = ({ champion, opponentChampion }) => (
  // const text = `${champion || 'Unknown'} / ${opponentChampion || 'Unknown'}`;
  // const textOverflow = text.length > MAX_MATCHUP_LENGTH;
  // if (textOverflow) {
  //   text = `${text.substring(0, MAX_MATCHUP_LENGTH - 3)}...`;
  //   return <div>
  //     <ChampText>{champion || 'Unknown'}</ChampText>/<OpponentText>{opponentChampion || 'Unknown'}</OpponentText>
  //   </div>
  // }
  <div>
    <ChampText>{champion || 'Unknown'}</ChampText>
    <OpponentText> / {opponentChampion || 'Unknown'}</OpponentText>
  </div>
);
const ListItem = ({ isLocalEntry, entry, active, entryIndex, onSelect }) => (
  <ListItemCont
    data-id={entry.id}
    data-entry-index={entryIndex}
    onClick={onSelect}
    active={active}
    className={active ? 'active' : ''}
  >
    {entry.outcome === 'W' ? (
      <WinIndicator />
    ) : (
      <LossIndicator name="circle thin" />
    )}
    <Matchup
      champion={entry.champion}
      opponentChampion={entry.opponentChampion}
    />
    <EndCont>
      <KDACont>
        {entry.kills}/{entry.deaths}/{entry.assists}
      </KDACont>
      <DateCont>{moment(entry.gameDate).fromNow()}</DateCont>
    </EndCont>
  </ListItemCont>
);

ListItem.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string,
    champion: PropTypes.string,
    opponentChampion: PropTypes.string,
  }).isRequired,
  isLocalEntry: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  entryIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const EntryListItem = ({
  entry,
  isLocalEntry,
  active,
  entryIndex,
  onSelect,
}) => (
  <ListItem
    isLocalEntry={isLocalEntry}
    entry={entry}
    active={active}
    entryIndex={entryIndex}
    onSelect={() => onSelect(entry.id)}
  />
);

EntryListItem.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string,
    champion: PropTypes.string,
    opponentChampion: PropTypes.string,
  }).isRequired,
  isLocalEntry: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  entryIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default EntryListItem;
