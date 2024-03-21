import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./Card.css";
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const StyledCard = styled.div`
  padding: 0;
`;

const Card = ({ cardTitle, Icon, Count }) => {
    return (
        <Col md={6} sm={12} xl={6} xs={12} xxl={4}>
        <div class="card card-page no-padding">
            <StyledCard class="card-body no-padding">
                <div className='row'>
                    <div className='col-12 card-title text-primary'>
                        {cardTitle}
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="card-icon"><FontAwesomeIcon icon={Icon} /></div>
                    </div>
                    <div class="col-6">
                        <div class="card-number">{Count}</div>
                    </div>
                </div>
            </StyledCard>
        </div>
        </Col>

    )
}
export default Card;