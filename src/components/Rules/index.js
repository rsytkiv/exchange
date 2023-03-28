import React from 'react';

import { RuleTemplate } from './ruleTemplate';

import { RULES_LABELS, RULES_OBJECT } from './content';

export const RulesPage = () => {
  return (
    <div className="rulesComponent">
      <h1>Rules</h1>
      <RuleTemplate
        label={RULES_LABELS.FIRST}
        rulesArray={RULES_OBJECT.FIRST}
      />
      <RuleTemplate
        label={RULES_LABELS.SECOND}
        rulesArray={RULES_OBJECT.SECOND}
      />
      <RuleTemplate
        label={RULES_LABELS.THIRD}
        rulesArray={RULES_OBJECT.THIRD}
      />
      <RuleTemplate
        label={RULES_LABELS.FOURTH}
        rulesArray={RULES_OBJECT.FOURTH}
      />
      <RuleTemplate
        label={RULES_LABELS.FIFTH}
        rulesArray={RULES_OBJECT.FIFTH}
      />
      <RuleTemplate
        label={RULES_LABELS.SIXTH}
        rulesArray={RULES_OBJECT.SIXTH}
      />
    </div>
  );
};
