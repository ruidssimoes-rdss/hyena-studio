"use client"

import { useRules } from "@/hooks/useRules"
import { RuleCard } from "./RuleCard"

export function RulesPanel() {
  const report = useRules()
  const violations = [...report.errors, ...report.warnings, ...report.info]
  const hasViolations = violations.length > 0
  const passedPct = report.total > 0 ? (report.passed / report.total) * 100 : 100
  const errorPct = report.total > 0 ? (report.errors.length / report.total) * 100 : 0
  const warnPct = report.total > 0 ? (report.warnings.length / report.total) * 100 : 0

  return (
    <div className="space-y-3">
      {/* Status */}
      <div>
        <p className="text-xs font-medium text-[var(--chrome-text)]">
          {report.passed} of {report.total} rules passed
        </p>

        {/* Progress bar */}
        <div className="flex h-[3px] rounded-full overflow-hidden mt-2 bg-[var(--chrome-muted)]">
          <div
            className="h-full bg-[var(--chrome-success)] transition-all duration-300"
            style={{ width: `${passedPct}%` }}
          />
          {warnPct > 0 && (
            <div
              className="h-full bg-[var(--chrome-warning)] transition-all duration-300"
              style={{ width: `${warnPct}%` }}
            />
          )}
          {errorPct > 0 && (
            <div
              className="h-full bg-[var(--chrome-error)] transition-all duration-300"
              style={{ width: `${errorPct}%` }}
            />
          )}
        </div>
      </div>

      {/* Violations or all-pass */}
      {hasViolations ? (
        <div className="space-y-1.5">
          {violations.map((result) => (
            <RuleCard key={result.rule.id} result={result} />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-xs font-medium text-[var(--chrome-text)]">
            All {report.total} rules pass
          </p>
          <p className="text-xs text-[var(--chrome-text-tertiary)] mt-1">
            No issues found
          </p>
        </div>
      )}
    </div>
  )
}
