import React from 'react';
import { resolve } from 'react-resolver';

import RequirementsView from './requirements-view';
import SearchFilterView from '../search-filter-view';
import TabView from '../tab-view';
import ExistingFilters from '../filters/existing-container';
import FilterListView from '../filters/list-view';
import Autocompleter from '../filters/autocompleter';
import api from '../../api';

function policiesTab(reqQuery) {
  // Transform filter keys into the format expected by policies
  const policyQuery = {};
  Object.keys(reqQuery).forEach((key) => {
    if (key.startsWith('policy__')) {
      policyQuery[key.slice('policy__'.length)] = reqQuery[key];
    } else if (!['page', 'ordering', 'format'].includes(key)) {
      policyQuery[`requirements__${key}`] = reqQuery[key];
    }
  });
  const link = { pathname: '/policies', query: policyQuery };
  return React.createElement(
    TabView,
    { active: false, tabName: 'Policies', key: 'Policies', link });
}

export function RequirementsContainer({ location: { query }, pagedReqs }) {
  const filterControls = [
    React.createElement(FilterListView, {
      autocompleter: React.createElement(Autocompleter, {
        insertParam: 'topics__id__in', lookup: 'topics' }),
      heading: 'Topics',
      key: 'topic',
    }),
  ];
  const tabs = [
    React.createElement(
      TabView, { active: true, tabName: 'Requirements', key: 'Requirements' }),
    policiesTab(query),
  ];
  const pageContent = React.createElement(
    RequirementsView,
    { requirements: pagedReqs.results, count: pagedReqs.count },
  );
  const selectedFilters = React.createElement(ExistingFilters, {
    fieldNames: { policies: 'policy__id__in', topics: 'topics__id__in' },
    query,
  });
  return React.createElement(
    SearchFilterView, { filterControls, pageContent, selectedFilters, tabs });
}
RequirementsContainer.propTypes = {
  location: React.PropTypes.shape({ query: React.PropTypes.shape({}) }),
  pagedReqs: React.PropTypes.shape({
    results: RequirementsView.propTypes.requirements,
    count: RequirementsView.propTypes.count,
  }),
};
RequirementsContainer.defaultProps = {
  location: { query: {} },
  pagedReqs: { results: [], count: 0 },
};

function fetchRequirements({ location: { query } }) {
  return api.requirements.fetch(query);
}

export default resolve({
  pagedReqs: fetchRequirements,
})(RequirementsContainer);
