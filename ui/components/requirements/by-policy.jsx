import React from 'react';
import { resolve } from 'react-resolver';

import api from '../../api';
import Pagers from '../pagers';

function ByPolicy({ pagedReqs }) {
  const policies = pagedReqs.results;
  return (
    <div>
      <ul className="list-reset">
        { policies.map(policy =>
          <li key={policy.id}>{policy.title} {policy.relevant_reqs}</li>)}
      </ul>
      <Pagers count={pagedReqs.count} />
    </div>
  );
}
ByPolicy.defaultProps = {
  pagedReqs: { results: [], count: 0 },
};

ByPolicy.propTypes = {
  pagedReqs: React.PropTypes.shape({
    results: React.PropTypes.arrayOf(React.PropTypes.shape({
      req_text: React.PropTypes.string,
      req_id: React.PropTypes.string,
    })),
    count: React.PropTypes.number,
  }),
};

const fetchRequirements = ({ location: { query } }) => {
  const params = Object.assign({}, query, { ordering: 'requirements__topics__id__in' });
  return api.policies.fetch(params);
};

export default resolve(
  'pagedReqs', fetchRequirements,
)(ByPolicy);
