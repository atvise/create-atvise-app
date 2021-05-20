/* eslint-disable no-var,vars-on-top,no-shadow */

declare namespace webMI {
  function callExtension(d, e);
  var query: Record<string, unknown>;
  function addEvent(d, e, f);
  function removeEvent();
  function isMobileTouchDevice();
  function addOnfocus(a);
  function addOnload(a);
  function addOnresize(a);
  function addOnunload(a);
  function getMethodSupport();
  function getFilterSupport();
  function getState();
  function getConfig(key: string): void;
  function setConfig(key: string, value: any): void;
  function hasRight(a);
  function setExtension(a, b, c);
  function inList(a, b);
  function isRedundant();
  function sprintf(a, b, c);
  function translate(a, b, c, d, e);
  function hashMD5(a);
  function secureString(a);
  function escapeHTML(a);
  function unescapeHTML(a);
  function isExternalHost(a, b);
  function proxy(a, b);
  function runInterval(a, b, c);
  function setInterval(a, b);
}

declare namespace webMI.alarm {
  function accept(a, b);
  function acceptDisplay();
  function subscribe(a, b);
  function unsubscribe(a);
}

declare namespace webMI.data {
  interface ResultError {
    error: number;
    errorstring: string;
  }

  type ResultSuccess<T> = {
    error: 0;
  } & T;

  type Result<T> = ResultError | ResultSuccess<T>;

  type ResultCallback<T> = (e: Result<T>) => void;
  type ResultArrayCallback<T> = (e: Result<T>[]) => void;

  interface VariableValue<T> {
    value: T;
    timestamp: number;
    status: number;
    description: { [language: string]: string };
  }

  // var paused: boolean;

  interface ClientVariables {
    preferredlanguage: string;
    right: string[];
    username: string;
  }

  type DataEvents = {
    clientvariableschange: ClientVariables;
  };

  function addEventListener<N extends keyof DataEvents>(
    name: N,
    callback: (e: DataEvents[N]) => void
  );
  function addEventListener<E = unknown>(name: string, callback: (e: E) => void);

  function removeEventListener();

  function loadScript(a, b);

  /**
   * Pauses the data communication for all subscriptions in the current display (counterpart to
   * `webMI.data.resume()`).
   */
  function pause();

  /**
   * Resumes the data communication for all subscriptions in the current display (counterpart to
   * `webMI.data.pause()`).
   */
  function resume();

  /**
   * Returns the state of the data communication in the current display. If "true" is returned, the
   * data communication is paused by the `webMI.data.pause()` function.
   */
  function isPaused(): boolean;

  /**
   * Allows you to call a function functionName that was implemented on the server side with a set
   * of arguments. Optionally, the function callback can be provided and will be executed when the
   * call is finished.
   *
   * @remarks
   *
   * ```js
   * webMI.data.call("serverCalculateSum", {"key1": "value1", "key2": "value2"}, function(e) {
   *   alert("callback function reached");
   * });
   * ```
   */
  function call<R = unknown>(
    functionName: string,
    arguments: { [key: string]: string | number },
    callback?: (e: ResultError | ResultSuccess<R>) => void
  ): void;

  function login(username: string, password: string, callback);

  function logout(callback);

  /**
   * Passes a current property object for every data variable specified by its nodeID to the
   * callback function. You can pass a single nodeID or an array of nodeIDs.
   *
   * @remarks
   *
   * Example
   * ```js
   * webMI.data.read("AGENT.OBJECTS.var1", function(e) {
   *   alert(e.value);
   * });
   * ```
   *
   * Example - Working with arrays:
   * ```js
   * var nodeAddressArray = ["AGENT.OBJECTS.var1", "AGENT.OBJECTS.var2"];
   * webMI.data.read(nodeAddressArray, function(e) {
   *   console.log(e[0].value);
   *   console.log(e[1].value);
   * });
   * ```
   *
   * @param nodeId - The node(s) to read
   * @param callback - Called with the read result(s)
   */
  function read<T = any>(nodeId: string, callback: ResultCallback<VariableValue<T>>): void;
  function read<T extends [...any[]] = [...any[]]>(
    nodeId: { [K in keyof T]: string },
    callback: (e: { [K in keyof T]: Result<VariableValue<T[K]>> }) => void
  ): void;

  function write(a, b, c);

  type SubscriptionId = number;

  /**
   * Subscribes to the data variable specified by nodeID. Every time the process value of this data
   * variable changes, the callback function is executed.
   * The current property object of this data variable is passed on to the function in e.
   *
   * @remarks
   *
   * Example:
   * ```js
   * webMI.data.subscribe("AGENT.OBJECTS.var1", function(e) {
   *   alert("var1 changed to " + e.value)
   * });
   *
   * Example - Working with a datavariable that is an array:
   * ```js
   * webMI.data.subscribe("AGENT.OBJECTS.testArray", function(e) {
   *   alert(e.value[0]);
   * });
   *
   * @param nodeId - The node to subscribe to
   * @param callback -
   * @returns A subscriptionId, which can be used to unsubscribe the data variable.
   */
  function subscribe<T = any>(
    nodeId: string,
    callback: ResultCallback<VariableValue<T>>
  ): SubscriptionId;

  /**
   * Unsubscribes the data variable with the given subscriptionId (return value from
   * `webMI.data.subscribe()`). The previously created subscription will not receive a notification
   * of the callback function anymore.
   *
   * @param subscriptionId - The subscription to cancel
   */
  function unsubscribe(subscriptionId: SubscriptionId);

  function subscribeBlock<T>(
    nodeIDs: string[],
    alarmIDs: string[],
    callback: ResultArrayCallback<VariableValue<T>>
  );

  enum FilterType {
    Variable = 'v:1',
    Alarm = 'v:2',
    Event = 'v:3',
  }

  /**
   * The filter consists of a number of properties where each property is an array of conditions.
   * Each condition consists of a type and a value, separated by a colon. Each condition must be
   * expressed as a string.
   *
   * @remarks
   *
   * E.g.:
   * ```js
   * {address: ["v:AGENT.OBJECTS.MyVariable"]}
   * ```
   * "address" is the property, "v" the type and "AGENT.OBJECTS.MyVariable" the value.
   *
   * The type of a condition must be one of the following:
   *  - **v**
   *
   *    The value of the property must match the value in the filter exactly. e.g.
   *    `{value: ["v:123"]}` means, that the value in the entry in the archive must be exactly "123"
   *    for the entry to be returned.
   *
   *  - **g**
   *
   *    The value in the filter is a GLOB pattern (supports the wildcards '*' and '?'). The value of
   *    the property must match this pattern for the entry to be returned. e.g.
   *    `{address: ["g:AGENT.OBJECTS.data.alarm*"]}` matches all addresses starting with
   *    "AGENT.OBJECTS.data.alarm".
   *
   *  - **n**
   *
   *    The value consists of up to two pairs of an operator and a corresponding numerical value.
   *    The supported operators are <, <=, >=, >, <> and =. e.g. `{value: ["n:>=10<20"]}` means,
   *    that the value in the entry in the archive must be between 10 (inclusive) and 20 (exclusive)
   *    for the entry to be returned.
   *
   *  - **u**
   *
   *    The entry is returned, if the property is undefined, e.g. `{ShelvingState: ["u:"]}` returns
   *    entries where the property ShelvingState doesn't exist.
   *
   * This list of properties is an open list. This means that other webMI servers can support
   * different properties or only a subset of the properties mentioned above. Usually at least
   * "type", "address" and "timestamp" are used.
   *
   * Example:
   * ```js
   * var filter = {};
   *
   * // value changes only
   * filter.type = ["v:1"]
   * // values from November 20, 2013 11:00 PM to 11:30 PM
   * // month starts with 0=January!
   * var from = new Date(2013, 10, 20, 23, 0, 0).getTime();
   * var to = from + 30*60*1000; // 30min in milliseconds
   * filter.timestamp = ["n:>=" + from + "<" + to];
   * // All variables starting with AGENT.OBJECTS.MyData
   * filter.address = ["g:AGENT.OBJECTS.MyData.*"];
   * // aggregated values, 5 minute average
   * filter.aggregate = ["v:Average"];
   * filter.interval = ["v:5"];
   * filter.unit = ["v:m"];
   *
   * webMI.data.queryFilter(filter, function(e){
   *   console.log(e.result);
   * });
   * ```
   */
  interface FilterOptions {
    /**
     * Type of the requested data: 1 - value changes (incl. aggregates), 2 - alarms, 3 - events
     * If missing in the filter, value changes, alarms and events will be requested (corresponds to
     * `{type: ["v:1", "v:2", "v:3"]}` ).
     */
    type?: FilterType[];
    /** Address of a variable; can - depending on the type of the condition - contain wildcards. */
    address?: string[];
    /**
     * The time stamp of the entry (source time, alarm time); is mostly used with the filter type
     * "n:" (see example). Time stamps are always expressed as number of milliseconds since
     * 1970-01-01 00:00 AM UTC (JavaScript time).
     */
    timestamp?: number[];
    /** The value of the entry for value changes, the alarm triggering value for alarms. */
    value?: any[];
    /** Active/inactive text for alarms, event text for events. */
    eventtext?: string[];
    /** For alarms only: priority of the alarm. */
    priority?: string[];
    /**
     * For alarms and events only: The user, who generated the entry in the archive (e.g.
     * acknowledgement of an alarm, login).
     */
    username?: string[];
    /**
     * Language code as e.g. "en" for English. The setting has the following effect on translated
     * attributes (for example, Description, alarm text):
     * - filters are only applied to the text translated into that language.
     * - values are returned only in this language.
     */
    language?: string[];
    /** The archives to consider for the query. */
    archive?: string[];
    /** The requested aggregate function (e.g. `{ aggregate: ["v:Average"] }`). */
    aggregate?: string[]; // FIXME: Use enum for aggregate function type
    /** The aggregate interval. */
    interval?: string[];
    /**
     * The unit of the aggregate interval. Possible values are "m" (minutes), "h" (hours), "d"
     * (days) and "M" (month). For the aggregate function "Sampled" you can also use "s" (seconds).
     */
    unit?: string[]; // FIXME: Use enum
    /**
     * Returns only the specified properties in the result. E.g. if you only need timestamp and
     * value, use `{ select: ["v:timestamp", "v:value"] }`.
     */
    select?: string[];
    /**
     * The maximum number of values that should be returned initially when requesting historical
     * data. A continuation point will be part of the returned data if more values are available.
     * See "continuationpoint" in query result below for how to handle the continuation point. If
     * "numrows" is not used, no continuation point will be used and the query returns all
     * available values, possible limited by the setting queryLimit in atserver.ini.
     */
    numrows?: string[];

    // init?: string[];
  }

  type LocalizedString = { [language: string]: string };

  // FIXME: Add descriptions
  type AggregateFunction =
    | 'AnnotationCount'
    | 'Average'
    | 'Count'
    | 'Delta'
    | 'DeltaBounds'
    | 'DurationBad'
    | 'DurationGood'
    | 'DurationInStateNonZero'
    | 'DurationInStateZero'
    | 'End'
    | 'EndBound'
    | 'Interpolative'
    | 'Maximum'
    | 'Maximum2'
    | 'MaximumActualTime'
    | 'MaximumActualTime2'
    | 'Minimum'
    | 'Minimum2'
    | 'MinimumActualTime'
    | 'MinimumActualTime2'
    | 'NumberOfTransitions'
    | 'PercentBad'
    | 'PercentGood'
    | 'Range'
    | 'Range2'
    | 'Sampled'
    | 'StandardDeviationPopulation'
    | 'StandardDeviationSample'
    | 'Start'
    | 'StartBound'
    | 'TimeAverage'
    | 'TimeAverage2'
    | 'Total'
    | 'Total2'
    | 'VariancePopulation'
    | 'VarianceSample'
    | 'WorstQuality'
    | 'WorstQuality2';

  enum AggregateUnit {
    Minutes = 'm',
    Hours = 'h',
    Days = 'd',
    Month = 'M',
    Seconds = 's',
  }

  /**
   * Various functions return an object which contains the current properties of the data variable.
   */
  type QueryResultVariable<T = any> = {
    address: string;
    description: LocalizedString;
    status: number;
    timestamp: number;
    type: 1;
    value: T;
    aggregate: AggregateFunction;
    interval: number;
    unit: AggregateUnit;
  };

  // FIXME: Re-export in modular-webmi
  enum AlarmState {
    InactiveAcknowledged = 0,
    ActiveUnacknowledged = 1,
    ActiveAcknowledged = 2,
    InactiveUnacknowledged = 3,
    ActiveUnacknowledgedAndInactiveUnacknowledged = 5,
  }

  /**
   * Alarm objects can be returned from e.g. `webMI.data.queryFilter()` or passed as parameter to
   * an alarm triggered script. Properties will not be contained in the alarm object if the
   * corresponding alarm field in the atvise server is not set.
   * @remarks
   * Standard webMI properties of the alarm object (a webMI server may support only a subset of the properties).
   *
   * Furthermore all replacement values are also contained in the alarm object. Replacement values are not available for conditions of mirrored alarms where no current alarm exists.
   */
  type QueryResultAlarm<T = any> = {
    /** true, if the alarm is acknowledged, else false */
    acknowledged: boolean;
    /** Timestamp of acknowledgment of the alarm, 0 if unacknowledged */
    acktime: number;
    /** Timestamp the alarm state changed to active */
    activetime: number;
    /** Address of the alarm condition */
    address: string;
    /** Address of the parent of the alarm configuration */
    base: string;
    /** true, if the alarm is confirmed, else false */
    confirmed: boolean;
    /** Multilingual description of the variable, for which the alarm is configured */
    description: LocalizedString;
    /** Name of the display configured at the alarm */
    display: string;
    /** Multilingual alarm text */
    eventtext: LocalizedString;
    /** For alarms always "AlarmConditionStateType" */
    eventtype: 'AlarmConditionStateType';
    /** Timestamp the alarm state changed to inactive */
    inactivetime: number;
    /** Priority of the alarm (1-1000) */
    priority: number;
    /** true, if the alarm should be shown in the alarm list, false if it should be removed */
    retain: boolean;
    /** webMI alarm state */
    state: AlarmState;
    /** Timestamp of the alarm change */
    timestamp: number;
    /** For alarms always 2 */
    type: 2;
    /**
     * The user setting the last comment (may be "System/Alarm" if the last comment was set
     * internally)
     */
    username: string;
    /** The alarm triggering value */
    value: T;
    /** Server timestamp of the alarm triggering value */
    valueservertimestamp: number;
    /** Status of the alarm triggering value */
    valuestatus: number;
    /** Source timestamp of the alarm triggering value */
    valuetimestamp: number;

    // Only on ativise server

    /** Multilingual textual representation of the acknowledgment state of the alarm */
    AckedState?: LocalizedString;
    /** Multilingual textual representation of the active state of the alarm */
    ActiveState?: LocalizedString;
    /** true, if the alarm is active, else false */
    ActiveStateId?: boolean;
    /** Unique identifier of the alarm */
    AlarmId?: string;
    /** OPC UA BranchId of the alarm */
    BranchId?: string;
    /** Optional comment (e.g. when acknowledging the alarm), always set together with the username */
    Comment?: string;
    /** Name of the alarm condition (e.g. for "AGENT.OBJECTS.var.ALARM.COND" the name is "COND") */
    ConditionName?: string;
    /** Multilingual textual representation of the Confirmed state of the alarm */
    ConfirmedState?: LocalizedString;
    /** Multilingual textual representation of the Enabled state of the alarm */
    EnabledState?: LocalizedString;
    /** true, if the alarm condition is enabled, else false */
    EnabledStateId?: boolean;
    /** Unique identifier for the event, that was triggered because of the change of the alarm */
    EventId?: string;
    /** Array of alarm groups the alarm is a member of */
    Groups?: string[];
    /** Used internally by atvise */
    InfoBits?: any;
    /** Address of the variable, for which the alarm is configured */
    InputNode?: string;
    /** Used internally by atvise */
    LastAlarmId?: any;
    /** If active and inactive state of an alarm must be acknowledged, ParentId contains the AlarmId of the corresponding alarm */
    ParentId?: string;
    /** Timestamp when atvise received the changed alarm */
    ReceiveTime?: number;
    /** Textual representation of the shelving state, e.g. "OneShotShelved" */
    ShelvingState?: string;
    /** Textual respresentation of the last transition between shelving states, e.g. "UnshelvedToOneShotShelved" */
    ShelvingStateLastTransition?: string;
    /** Timestamp of the last transitions between shelving states */
    ShelvingStateLastTransitionTransitionTime?: number;
    /** Milliseconds until the alarm will be automatically unshelved */
    ShelvingStateUnshelveTime?: number;
    /** Name of the alarm configuration (e.g. for "AGENT.OBJECTS.var.ALARM.COND" the name is "ALARM") */
    SourceName?: string;
    /** Address of the alarm configuration (e.g. for "AGENT.OBJECTS.var.ALARM.COND" the name is "AGENT.OBJECTS.var.ALARM") */
    SourceNode?: string;
    /** true, if the alarm is either suppressed or shelved, else false */
    SuppressedOrShelved?: boolean;
    /** Multilingual textual representation of the Suppressed state of the alarm */
    SuppressedState?: LocalizedString;
    /** true, if the alarm is suppressed, else false */
    SuppressedStateId?: boolean;

    // Optionally on atvise server

    /** Abbreviation of the alarm category */
    Abbreviation?: string;
    /** Background color for the alarm */
    Color?: string;
    /** Blinking interval in milliseconds for active unacknowledged alarms */
    Flashtimeack?: number;
    /** Blinking interval in milliseconds for inactive unacknowledged alarms */
    Flashtimeinack?: number;
    /** Font color for the alarm */
    Fontcolor?: string;
    /** User defined color for arbitrary use */
    UserColor1?: string;
    /** User defined color for arbitrary use */
    UserColor2?: string;
    /** User defined color for arbitrary use */
    UserColor3?: string;
    /** User defined color for arbitrary use */
    UserColor4?: string;
  };

  /** An event object (e.g. as result of `webMI.data.queryFilter()`) */
  type QueryResultEvent = {
    /** Internal address of the event source (e.g. "WebAccessLoginEventType") */
    address: string;
    /** Multilingual text of the event */
    eventtext: LocalizedString;
    /** Browsename of the OPC UA event type */
    eventtype: string;
    /** Priority of the event (1-1000) */
    priority: number;
    /** Timestamp when the event was triggered */
    timestamp: number;
    /** For events always 3 */
    type: 3;
    /** The user who triggered the event */
    username: string;
    /** Unique identifier of the event */
    EventId: string;
    /** Timestamp when atvise received the event */
    ReceiveTime: number;
    /** Internal name of the event source (e.g. "Server/WebAccess/Login") */
    SourceName: string;
    /** Same as address */
    SourceNode: string;
  };

  type QueryResultValue<T = any> = QueryResultVariable<T> | QueryResultAlarm<T> | QueryResultEvent;

  type QueryResultObject<T> = {
    /**
     * true, if the result is truncated because of the query limit (see queryLimit in atserver.ini),
     * otherwise false. Only for atvise server.
     */
    More: boolean;
    /**
     * If "numrows" was used in the filter, the query may return a continuation point to allow the
     * user to retrieve huge results sets. If the returned data contains a continuation point (a
     * value greater than 0), the "queryNext" (`webMI.data.queryNext()`, `history.queryNext()`)
     * function can be called with the continuation point to retrieve additional data. The query is
     * finished, when the returned continuation point is 0. If the query should be canceled before
     * all data is retrieved, use "queryRelease" (`webMI.data.queryRelease()`,
     * `history.queryRelease()`) to free the resources used by the continuation point.
     */
    continuationpoint: number;
    /**
     * Array with result values, where every element of the array is a type-specific Javascript
     * object.
     */
    result: QueryResultValue<T>[];
  };

  type SubscribeFilterOptions = FilterOptions & {
    /** If initial raw and aggregated values should be returned. */
    init?: ['v:true'] | ['v:false'];
  };

  /**
   * This function subscribes to changes of variables, alarms and events on the server depending on
   * the given filter object "filter". Every time one of the subscribed items changes, the callback
   * function will be called with an object described in query result.
   *
   * @remarks
   *
   * If the server supports it, this function can also be used to subscribe to aggregated values.
   * atvise returns aggregated values only if they are actually calculated in the server. See
   * Parametrization of aggregates for how to parameterize atvise to calculate aggregated values.
   *
   * **Initial raw and aggregated values** can additionally be requested by specifying the filter
   * property init with a value of ["v:true"]. Note, that for the initial values only the filter
   * properties address, aggregate, interval and unit are used, all other properties are ignored.
   * This ensures that you always get the current values and then all changes according to the full
   * filter specification.
   *
   * ```js
   * var filter = {};
   * filter.address = ["g:AGENT.OBJECTS.MyData.*"];
   * filter.type = [];
   * filter.type.push("v:1"); // node
   * filter.type.push("v:2"); // alarm
   * filter.init = ["v:true"]; // initial raw values for AGENT.OBJECTS.MyData.*
   * webMI.data.subscribeFilter(filter, function(e) {
   *     var item = e;
   *     // ...
   * });
   * ```
   *
   * @param filter - The filter to apply.
   * @param callback - Called every time one of the subscribed items changes.
   * @returns A subscriptionId, which can be used to unsubscribe.
   */
  function subscribeFilter<T>(
    filter: SubscribeFilterOptions,
    callback: ResultCallback<QueryResultValue<T>>
  ): SubscriptionId;

  /**
   * Unsubscribes the previously subscribed filter with id "subscriptionId". No more notifications
   * will be published to the callback function.
   * @param subscriptionId - The subscription to cancel
   */
  function unsubscribeFilter(subscriptionId: SubscriptionId);

  /**
   * This function makes a query to the server and requests historical data. The parameter "filter"
   * is used to constrain the requested data. The result will be received in the callback function.
   *
   * @remarks
   *
   * Example:
   * ```js
   * var filter = {};
   * filter.type = ["v:1"];
   * filter.address = ["g:AGENT.OBJECTS.MyData.*"];
   * // set other filter properties as desired
   * webMI.data.queryFilter(filter, function(e) {
   *   console.log(e.result);
   * });
   * ```
   *
   * @param filter - The filter to use.
   * @param callback - Called with the results.
   */
  function queryFilter<T>(filter: FilterOptions, callback: ResultCallback<QueryResultObject<T>>);

  /**
   * Continues a query started with `webMI.data.queryFilter` using the given continuation point. Can
   * be called repeatedly as long as a continuation point is returned.
   *
   * @remarks
   *
   * See "continuationpoint" in query result for how to handle continuation points.
   *
   * @param continuationpoint - The continuation point to use
   * @param callback - Called with the results
   */
  function queryNext<T>(continuationpoint: number, callback: ResultCallback<QueryResultObject<T>>);

  function queryRelease(a, b, c);

  type ReadFilterOptions = Pick<FilterOptions, 'address' | 'aggregate' | 'interval' | 'unit'>;

  /**
   * This functions reads current raw and aggregated values according to the given "filter". From
   * the filter object described below only the filter properties address, aggregate, interval and
   * unit are used, all other properties are ignored.
   *
   * @remarks
   *
   * The result will be received in the callback function.
   *
   * On the server-side you can use the analog function opcua.readFilter().
   *
   * Example, read all current aggregated values which use the function "Average":
   * ```js
   * var filter = {};
   * filter.address = ["g:AGENT.OBJECTS.MyData.*"];
   * filter.aggregate = ["v:Average"];
   * webMI.data.readFilter(filter, function(e) {
   *   // use returned values
   * });
   * ```
   *
   * @param filter - The filter to use.
   * @param callback - Called with the results
   */
  function readFilter<T>(filter: ReadFilterOptions, callback: ResultCallback<QueryResultObject<T>>);

  type RequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
  // FIXME: Need better typing here...
  type UnfinishedRequest = Record<string, unknown>;
  type CustomRequestCallback<T> = (e: T, unfinishedRequest?: UnfinishedRequest) => void;

  /**
   * This function allows to send an arbitrary HTTP request to the server. Because of security
   * reasons, "customRequest" only works with an active and valid webMI connection and session.
   *
   * @remarks
   *
   * Example 1, info request clone:
   * ```js
   * webMI.data.customRequest("POST", "/webMI/?info", function(e) {
   *   console.log(e);
   * });
   * ```
   *
   * Example 2, read request clone:
   * ```js
   * webMI.data.customRequest("POST", "/webMI/?read", "", "address[]=AGENT.OBJECTS.var", function(e) {
   *   console.log(e);
   * });
   * ```
   *
   * Example 3, using "unfinishedRequest":
   * ```js
   * webMI.data.customRequest("PUT", "", "", file, function(e, unfinishedRequest) {
   *   if (unfinishedRequest) {
   *     // Do something with the unfinished request object
   *   } else {
   *     // Do something when request is finished
   *   }
   * });
   * ```
   *
   * @param method - Can be POST, GET, PUT, DELETE, PATCH or HEAD, whereby the atvise server only
   * supports POST and GET. The other methods can only be used if they are supported by the
   * respective webMI server.
   * @param subUrl - Is the path of the resource on the server.
   * @param additionalHttpHeader - Own HTTP header lines can be passed to the request. If multiple
   * header lines are passed, they must be separated by ", "
   * (e.g. "Pragma: no-cache, Cache-Control: no-cache").
   * @param body - The body of the request can be passed if needed.
   * @returns The result of the request will be passed to the callback function. You can pass an
   * optional second parameter ("unfinishedRequest") to the callback function. The request object
   * will then be returned immediately and not only when the request is finished. This e.g. allows
   * to monitor the "progress" status in case of a PUT upload.
   */
  function customRequest<T = unknown>(
    method: RequestMethod,
    subUrl: string,
    callback: CustomRequestCallback<T>
  );
  function customRequest<T = unknown>(
    method: RequestMethod,
    subUrl: string,
    additionalHttpHeader: string,
    data: string,
    callback: CustomRequestCallback<T>
  );
}

declare namespace webMI.display {
  function createURL(a, b);
  function getCurrentScaleFactor();
  function getViewBox();
  function getInitialViewBox();
  function setViewBox(a, b, c, d);
  function getURLPostfix();
  function getURLPrefix();
  function getActiveFrames();
  function isRoot();
  function isHTML();
  function isSVG();
  function isVML();
  function setEnableAutoFit(a);
  function setForeignObjectHandler(a, b, c, d, e, f, m);
  function setURLPostfix(a);
  function setURLPrefix(a);
  function setOpenUrlHandler(a);
  function setOpenWindowHandler(a, b);
  function setShowPopupHandler(a, b);
  function openDisplay(a, b, c);
  function openUrl(a, b, c);
  function openWindow(a, b, c, d, e, f, m, g);
  function closeWindow(a);
  function showPopup(a, b, c);
}

declare namespace webMI.dom {
  function createElement(a, b);
  function createTextNode(a);
  function getAttribute(a, b, c);
  function setAttribute(a, b, c, d);
}

declare namespace webMI.frame {
  function createURL(a, b);
  function getCurrentScaleFactor();
  function getViewBox();
  function getInitialViewBox();
  function setViewBox(a, b, c, d);
  function getURLPostfix();
  function getURLPrefix();
  function getActiveFrames();
  function isRoot();
  function isHTML();
  function isSVG();
  function isVML();
  function setEnableAutoFit(a);
  function setForeignObjectHandler(a, b, c, d, e, f, m);
  function setURLPostfix(a);
  function setURLPrefix(a);
  function setOpenUrlHandler(a);
  function setOpenWindowHandler(a, b);
  function setShowPopupHandler(a, b);
  function openDisplay(a, b, c);
  function openUrl(a, b, c);
  function openWindow(a, b, c, d, e, f, m, g);
  function closeWindow(a);
  function showPopup(a, b, c);
}

declare namespace webMI.sound {
  function setHandler(a, b);
  function play();
  function stop();
}

declare namespace webMI.keys {
  // function addCombinationListener(a, b, c);
  function addDownListener(a, b);
  function addUpListener(a, b);
  function addPressListener(a, b);
  // function isDown(a);
}

declare namespace webMI.trendFactory {
  function createTrend(a, b, c);
  function getTrendByContainerID(a);
  function getTrendByName(a, b);
  function getTrendByGroup(a);
  function getAllTrends();
}

declare namespace webMI.libraryLoader {
  var ready: boolean;
  function getReady();
  function load(a, d, e);
  function jQuery(a);
}

declare namespace webMI.table {
  var ready: boolean;
  function loadResources(a, b);
  function register(a, b, f, m);
  function request(a, b);
  function setReady(a, e);
  function waitReady(a, e, f);
}

declare namespace webMI.gfx {
  function createPoint(a, b);
  function scaleEventCoordinates(a, b, c, d);
  function setScaledEvents(a, b, c, d);
  function getAbsoluteScaleFactor(a, b);
  function getAbsoluteOffset(a, b, c);
  function getBoundingClientRect(a);
  function getAttribute(a, b);
  function setAttribute(a, b, c);
  function setMoveX(b, c);
  function setMoveY(b, c);
  function setRotation(b, c);
  function setScaleX(b, c);
  function setScaleY(b, c);
  function setSkewX(b, c);
  function setSkewY(b, c);
  function addElement(a, b, c);
  function getScreenCTM(a, b);
  function addForeignObject(a, b);
  function removeForeignObject(a);
  function addCircle(b, d);
  function addEllipse(b, d);
  function addGroup(b, d);
  function addImage(b, d);
  function addLine(b, d);
  function addPath(b, d);
  function addPolygon(b, d);
  function addPolyline(b, d);
  function addRect(b, d);
  function addText(b, d);
  function getX1Direct(b);
  function getX1(a);
  function setX1Direct(b, d);
  function setX1(a, b);
  function getX2Direct(b);
  function getX2(a);
  function setX2Direct(b, d);
  function setX2(a, b);
  function getY1Direct(b);
  function getY1(a);
  function setY1Direct(b, d);
  function setY1(a, b);
  function getY2Direct(b);
  function getY2(a);
  function setY2Direct(b, d);
  function setY2(a, b);
  function getCenterXDirect(b);
  function getCenterX(a);
  function setCenterXDirect(b, d);
  function setCenterX(a, b);
  function getCenterYDirect(b);
  function getCenterY(a);
  function setCenterYDirect(b, d);
  function setCenterY(a, b);
  function getRadiusXDirect(b);
  function getRadiusX(a);
  function setRadiusXDirect(b, d);
  function setRadiusX(a, b);
  function getRadiusYDirect(b);
  function getRadiusY(a);
  function setRadiusYDirect(b, d);
  function setRadiusY(a, b);
  function getRadiusDirect(b);
  function getRadius(a);
  function setRadiusDirect(b, d);
  function setRadius(a, b);
  function getFontFamilyDirect(b);
  function getFontFamily(a);
  function setFontFamilyDirect(b, d);
  function setFontFamily(a, b);
  function getFontSizeDirect(b);
  function getFontSize(a);
  function setFontSizeDirect(b, d);
  function setFontSize(a, b);
  function getFillOpacityDirect(b);
  function getFillOpacity(a);
  function setFillOpacityDirect(b, d);
  function setFillOpacity(a, b);
  function getFillRuleDirect(b);
  function getFillRule(a);
  function setFillRuleDirect(b, d);
  function setFillRule(a, b);
  function getPathDataDirect(b);
  function getPathData(a);
  function setPathDataDirect(b, d);
  function setPathData(a, b);
  function getStrokeDirect(b);
  function getStroke(a);
  function setStrokeDirect(b, d);
  function setStroke(a, b);
  function getStrokeLinejoinDirect(b);
  function getStrokeLinejoin(a);
  function setStrokeLinejoinDirect(b, d);
  function setStrokeLinejoin(a, b);
  function getStrokeOpacityDirect(b);
  function getStrokeOpacity(a);
  function setStrokeOpacityDirect(b, d);
  function setStrokeOpacity(a, b);
  function getStrokeWidthDirect(b);
  function getStrokeWidth(a);
  function setStrokeWidthDirect(b, d);
  function setStrokeWidth(a, b);
  function getTextAnchorDirect(b);
  function getTextAnchor(a);
  function setTextAnchorDirect(b, d);
  function setTextAnchor(a, b);
  function getFillDirect(a);
  function getFill(a);
  function setFillDirect(a, b);
  function setFill(a, b);
  function getPointsDirect(a);
  function getPoints(a);
  function setPointsDirect(a, b);
  function setPoints(a, b);
  function getHeightDirect(b);
  function getHeight(a);
  function setHeightDirect(b, c);
  function setHeight(a, b);
  function getImageDirect(a);
  function getImage(a);
  function setImageDirect(a, b);
  function setImage(a, b);
  function getStrokeDasharrayDirect(a);
  function getStrokeDasharray(a);
  function setStrokeDasharrayDirect(a, b);
  function setStrokeDasharray(a, b);
  function getTextDirect(a);
  function getText(a);
  function setTextDirect(a, b);
  function setText(a, b);
  function getVisibleDirect(a);
  function getVisible(a);
  function setVisibleDirect(a, b);
  function setVisible(a, b);
  function getWidthDirect(b);
  function getWidth(a);
  function setWidthDirect(b, c);
  function setWidth(a, b);
  function getXDirect(b);
  function getX(a);
  function setXDirect(b, c);
  function setX(a, b);
  function getYDirect(b);
  function getY(a);
  function setYDirect(b, c);
  function setY(a, b);
}

declare namespace webMI.trigger {
  // function connect(a, b, c);
  // function fire(a, b, c);
}

declare namespace webMI.widget.checkbox {
  function isChecked(a);
  function setChecked(a, b);
}

declare namespace webMI.widget.combobox {
  function addItem(a, b, c);
  function setItems(a, b);
}

declare namespace webMI.widget {
  function getDisabled(a);
  function setDisabled(a, b);
  function getValue(a);
  function setValue(a, b);
}
