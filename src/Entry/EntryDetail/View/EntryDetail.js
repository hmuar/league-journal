import React from 'react';
import { Grid, Card, Button, Accordion, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreepScoreView from './SubViewCreepScore';
import SecondaryList from './SecondaryList';
import Header from './Header';
import MarkableList from './MarkableList';

const MainCont = styled.div`
  padding: 20px;
`;

const MainCard = styled(Card)`
  height: 100%;
  &&& {
    border-radius: 0;
  }
`;

const CardHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding: 20px 20px 5px;
`;

const CardContentList = styled.div`
  &&& {
    padding: 10px 20px;
    border-top: none;
  }
`;

const SecondaryCont = styled.div`
  margin-top: 20px;
`;

const EditBtn = styled(Button)`
  &&& {
    background-color: #37474f;
  }
`;

class EntryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: [0] };
  }

  handleAccordionClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const arrIndex = activeIndex.indexOf(index);
    if (arrIndex !== -1) {
      activeIndex.splice(arrIndex, 1);
    } else {
      activeIndex.push(index);
    }
    this.setState({ activeIndex });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading entry...</div>;
    }
    const { props } = this;
    const entry = this.props.data.Entry;
    return (
      <MainCont>
        <EditBtn
          icon="write"
          color="black"
          circular
          size="large"
          onClick={() => props.setEditMode(true, entry.id)}
        />
        <Header {...entry} />
        <Grid stackable columns={2}>
          <Grid.Column>
            <MainCard raised fluid>
              <CardHeader>Mistakes</CardHeader>
              <CardContentList>
                <MarkableList
                  items={entry.mistakes}
                  onMark={props.markMistake}
                />
              </CardContentList>
            </MainCard>
          </Grid.Column>
          <Grid.Column>
            <MainCard raised fluid>
              <CardHeader>Lessons</CardHeader>
              <CardContentList>
                <MarkableList items={entry.lessons} onMark={props.markLesson} />
              </CardContentList>
            </MainCard>
          </Grid.Column>
        </Grid>
        <SecondaryCont>
          <Card fluid raised>
            <Accordion fluid styled exclusive={false}>
              <Accordion.Title
                active={this.state.activeIndex.includes(0)}
                onClick={this.handleAccordionClick}
                index={0}
              >
                <Icon name="dropdown" />Creep Score
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex.includes(0)}>
                <CreepScoreView
                  csReasons={entry.csReasons}
                  csPerMin={entry.csPerMin}
                  csAt5Min={entry.csAt5Min}
                  csAt10Min={entry.csAt10Min}
                  csAt15Min={entry.csAt15Min}
                  csAt20Min={entry.csAt20Min}
                />
              </Accordion.Content>
              <Accordion.Title
                active={this.state.activeIndex.includes(1)}
                onClick={this.handleAccordionClick}
                index={1}
              >
                <Icon name="dropdown" />Death Reasons
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex.includes(1)}>
                <SecondaryList items={entry.deathReasons} />
              </Accordion.Content>
              <Accordion.Title
                active={this.state.activeIndex.includes(2)}
                onClick={this.handleAccordionClick}
                index={2}
              >
                <Icon name="dropdown" />Positives
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex.includes(2)}>
                <SecondaryList items={entry.positives} />
              </Accordion.Content>
            </Accordion>
          </Card>
        </SecondaryCont>
      </MainCont>
    );
  }
}

EntryDetail.propTypes = {
  data: PropTypes.shape({ Entry: PropTypes.object, loading: PropTypes.bool })
    .isRequired,
};

export default EntryDetail;