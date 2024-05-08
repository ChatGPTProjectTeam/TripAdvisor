import React from "react";

<section className={`main-plan-container ${ startAnimation ? 'show-animate' : ''}`}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div>
                    <div style={{display: "flex", justifyContent: 'center', maxWidth: '980px', marginBottom: '20px'}}>
                        <PlanTitleLogo/>
                        <h1 style={{fontSize: '30px'}}> {filteredPlan.province} Plan</h1>
                        <PlanTitleLogo/>
                    </div>
                    {/*{filteredPlan.length > 0 ? (*/}
                    {/*    filteredPlan.map((targetPlan, index) => (*/}
                    {/*        <div key={index}>*/}
                    {/*            {filteredPlan.plan_component_list.map((component, index) => (*/}
                    {/*                <div key={index}>*/}
                    {/*                    /!*<h3>Component {index + 1}</h3>*!/*/}
                    {/*                    <FlightPlan component={component} targetId={targetId}/>*/}
                    {/*                    /!*<AccommodationPlan component={component} targetId={targetId}/>*!/*/}
                    {/*                    /!*<DayPlan component={component} targetId={targetId} componentId={index + 1}/>*!/*/}

                    {/*                </div>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*    ))*/}
                    {/*) : (*/}
                    {/*    <p>No trip plan found for chat ID {targetId}</p>*/}
                    {/*)}*/}
                </div>

            </div>

        </section>